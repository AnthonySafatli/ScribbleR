using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Models;

namespace ScribbleR.Server.Data;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
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
}
