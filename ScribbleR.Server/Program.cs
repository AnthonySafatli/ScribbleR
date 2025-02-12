using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Data;
using ScribbleR.Server.Models;
using System.Security.Claims;

namespace ScribbleR.Server
{
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

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.MapIdentityApi<AppUser>();
            
            app.MapPost("/logout", async (SignInManager<AppUser> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok();
            }).RequireAuthorization();

            app.MapGet("/pingauth", (ClaimsPrincipal user) =>
            {
                var email = user.FindFirstValue(ClaimTypes.Email);
                return Results.Json(new { Email = email });
            }).RequireAuthorization();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
