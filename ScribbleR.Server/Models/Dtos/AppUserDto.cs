namespace ScribbleR.Server.Models.Dtos;

public class AppUserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string UserHandle { get; set; }
    public string? DisplayName { get; set; }
    public string? AboutMe { get; set; }
    public CanvasPath[]? ProfilePicture { get; set; }

    public AppUserDto(AppUser appUser)
    {
        Id = appUser.Id;
        Email = appUser.Email ?? "";
        UserHandle = appUser.UserHandle ?? "";
        DisplayName = appUser.DisplayName;
        AboutMe = appUser.AboutMe;
        ProfilePicture = appUser.ProfilePicturePaths;
    }
}
