using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Models;
using System.Reflection.Emit;

namespace ScribbleR.Server.Data;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Friendship>()
            .HasOne(f => f.RequestFromUser)
            .WithMany()
            .HasForeignKey(f => f.RequestFromUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Friendship>()
            .HasOne(f => f.RequestToUser)
            .WithMany()
            .HasForeignKey(f => f.RequestToUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Sketch>()
            .Property(d => d.CanvasPathsJson)
            .HasColumnType("jsonb");
    }


    public override int SaveChanges()
    {
        var entities = ChangeTracker.Entries()
                                    .Where(e => e.Entity is AppUser &&
                                                (e.State == EntityState.Added || e.State == EntityState.Modified));

        foreach (var entity in entities)
        {
            if (entity.State == EntityState.Added)
            {
                ((AppUser)entity.Entity).CreatedAt = DateTime.UtcNow;
            }

            ((AppUser)entity.Entity).UpdatedAt = DateTime.UtcNow;
        }

        return base.SaveChanges();
    }

    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<Friendship> Friendships { get; set; }
}
