using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Data;
using ScribbleR.Server.Models;
using System.Security.Claims;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Globalization;
using ScribbleR.Server.Hubs;
using ScribbleR.Server.Models.Dtos;

namespace ScribbleR.Server;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        builder.Services.AddAuthorization();
        builder.Services.AddIdentityApiEndpoints<AppUser>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        builder.Services.AddSignalR();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(opt =>
        {
            opt.AddPolicy("reactApp", builder =>
            {
                builder.WithOrigins("http://172.105.22.39/", "http://172.105.22.39/", "http://scribbler.anthonysafatli.ca/", "https://scribbler.anthonysafatli.ca/")
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        builder.Services.AddSingleton<SharedDb>();

        var app = builder.Build();

        app.MapGroup("/api/auth")
            .MapIdentityApi<AppUser>();

        app.MapPost("/api/auth/logout", async (SignInManager<AppUser> signInManager) =>
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        }).RequireAuthorization();

        app.MapGet("/api/auth/pingauth", async (ClaimsPrincipal user, UserManager<AppUser> userManager) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier); 
            var appUser = await userManager.FindByIdAsync(userId); 

            if (appUser == null)
                return Results.Unauthorized(); 

            return Results.Json(new AppUserDto(appUser));
        }).RequireAuthorization();

        app.MapGet("/api/auth/needsregister", async (string email, UserManager<AppUser> userManager) =>
        {
            // Basic Email validation
            if (string.IsNullOrEmpty(email) || !IsValidEmail(email))
            {
                return Results.BadRequest("Invalid email address.");
            }

            var user = await userManager.FindByEmailAsync(email);
            return Results.Json(new { NeedsRegister = (user == null) } );
        });

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            db.Database.Migrate();
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("reactApp");

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();
        
        app.MapControllers();
        app.MapHub<ChatHub>("/api/Chat");

        app.Run();
    }

    //Helper function to validate email format.  Could be replaced with a more robust solution if needed.
    private static bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return false;

        try
        {
            // Normalize the domain
            email = Regex.Replace(email, @"(@)([^@]+)$", DomainMapper,
                                  RegexOptions.None, TimeSpan.FromMilliseconds(200));

            // Examines the domain part of the email and normalizes it.
            string DomainMapper(Match match)
            {
                // Use IdnMapping class to convert Unicode domain names.
                var idn = new IdnMapping();

                // Pull out and process domain name (throws ArgumentException on invalid)
                string domainName = idn.GetAscii(match.Groups[2].Value);

                return match.Groups[1].Value + domainName;
            }
        }
        catch (RegexMatchTimeoutException e)
        {
            return false;
        }
        catch (ArgumentException e)
        {
            return false;
        }

        try
        {
            return Regex.IsMatch(email,
                @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
        }
        catch (RegexMatchTimeoutException)
        {
            return false;
        }
    }
}
