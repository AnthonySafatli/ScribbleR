using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ScribbleR.Server.Models;

public class AppUser : IdentityUser
{
    [StringLength(50)]
    public string? UserHandle { get; set; }

    [StringLength(50)]
    public string? DisplayName { get; set; }

    public string? ProfilePicture { get; set; }
    [NotMapped]
    public CanvasPath[]? ProfilePicturePaths
    {
        get
        {
            if (string.IsNullOrWhiteSpace(ProfilePicture))
                return null;

            try
            {
                return JsonSerializer.Deserialize<CanvasPath[]>(ProfilePicture);
            }
            catch (JsonException)
            {
                return null;
            }
        }
        set
        {
            ProfilePicture = value == null ? null : JsonSerializer.Serialize(value);
        }
    }

    [StringLength(200)]
    public string? AboutMe { get; set; }

    [StringLength(2083)]
    public string? SocialMedia { get; set; }
}
