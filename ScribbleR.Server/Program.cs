using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Data;
using ScribbleR.Server.Hubs;
using ScribbleR.Server.Models;

namespace ScribbleR.Server;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Database
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        // Identity
        builder.Services.AddAuthorization();

        builder.Services.AddIdentityApiEndpoints<AppUser>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        // Services
        builder.Services.AddSignalR();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("reactApp", policy =>
            {
                policy
                    .WithOrigins(
                        "http://172.105.22.39",
                        "https://172.105.22.39",
                        "http://scribbler.anthonysafatli.ca",
                        "https://scribbler.anthonysafatli.ca"
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        builder.Services.AddSingleton<SharedDb>();

        var app = builder.Build();

        // Apply Migrations
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            try
            {
                db.Database.Migrate();
                Console.WriteLine("Database migrations applied successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Database migration failed:");
                Console.WriteLine(ex);
            }
        }

        // Configure pipeline
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
}
