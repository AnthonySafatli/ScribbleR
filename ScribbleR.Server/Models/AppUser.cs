using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ScribbleR.Server.Models;

public class AppUser : IdentityUser
{
    [StringLength(50)]
    public string? UserHandle { get; set; }

    [StringLength(50)]
    public string? DisplayName { get; set; }

    public int? SketchId { get; set; }
    public Sketch? Sketch { get; set; }

    [StringLength(200)]
    public string? AboutMe { get; set; }

    [StringLength(2083)]
    public string? SocialMedia { get; set; }
    
    public bool IsSetup { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
