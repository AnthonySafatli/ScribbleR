namespace ScribbleR.Server.Models.Dtos;

public class AppUserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string UserHandle { get; set; }
    public string? DisplayName { get; set; }
    public string? AboutMe { get; set; }
    public bool IsSetup { get; set; }
    public CanvasPath[]? ProfilePicture { get; set; }

    public AppUserDto(string Id, string? Email, string? UserHandle, string? DisplayName, string? AboutMe, bool IsSetup)
    {
        this.Id = Id;
        this.Email = Email ?? "";
        this.UserHandle = UserHandle ?? "";
        this.DisplayName = DisplayName;
        this.AboutMe = AboutMe;
        this.IsSetup = IsSetup;
    }

    public AppUserDto(AppUser appUser)
    {
        Id = appUser.Id;
        Email = appUser.Email ?? "";
        UserHandle = appUser.UserHandle ?? "";
        DisplayName = appUser.DisplayName;
        AboutMe = appUser.AboutMe;
        IsSetup = appUser.IsSetup;
        ProfilePicture = appUser.Sketch?.CanvasPaths;
    }
}
