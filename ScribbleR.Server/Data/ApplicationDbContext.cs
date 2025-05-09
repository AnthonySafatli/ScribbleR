using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ScribbleR.Server.Models;
using ScribbleR.Server.Models.Base;
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

        builder.Entity<AppUser>()
            .Property(d => d.ProfilePicture)
            .HasColumnType("jsonb");
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        UpdateAuditValues();
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
    {
        UpdateAuditValues();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private void UpdateAuditValues()
    {
        IEnumerable<EntityEntry> entities = ChangeTracker
           .Entries()
           .Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);

        foreach (var ent in entities)
        {
            var realEnt = ent.Entity as BaseModel;
            if (realEnt == null) continue;

            if (ent.State == EntityState.Added)
            {
                realEnt.CreatedAt = DateTime.Now;
            }
            else
            {
                ent.Property("CreatedAt").IsModified = false;
            }
            realEnt.UpdatedAt = DateTime.Now;
        }
    }

    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<Friendship> Friendships { get; set; }
}
