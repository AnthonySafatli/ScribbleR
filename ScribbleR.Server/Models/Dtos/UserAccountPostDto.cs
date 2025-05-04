using System.ComponentModel.DataAnnotations;

namespace ScribbleR.Server.Models.Dtos;

public class UserAccountPostDto
{
    [StringLength(50)]
    public string? UserHandle { get; set; }

    [StringLength(50)]
    public string? DisplayName { get; set; }

    [StringLength(200)]
    public string? AboutMe { get; set; }

    public CanvasPath[]? ProfilePicture { get; set; }
}