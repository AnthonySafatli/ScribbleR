using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Data;
using ScribbleR.Server.Models;
using ScribbleR.Server.Models.Dtos;

namespace ScribbleR.Server.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDbContext _context;

    public AccountController(UserManager<AppUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpPost("Setup")]
    public async Task<IActionResult> SetupAccount([FromBody] UserAccountPostDto setupInfo)
    {
        AppUser? user = await _userManager.GetUserAsync(User);
        if (user == null) return Forbid();

        AppUser? existingUser = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserHandle == setupInfo.UserHandle);

        if (existingUser != null)
            return BadRequest("User handle is already taken.");

        if (string.IsNullOrWhiteSpace(setupInfo.UserHandle)) 
            return BadRequest("User Handle cannot be empty");
         
        if (string.IsNullOrWhiteSpace(setupInfo.DisplayName))
            return BadRequest("Display Name cannot be empty");

        user.UserHandle = setupInfo.UserHandle;
        user.DisplayName = setupInfo.DisplayName;
        user.AboutMe = string.IsNullOrWhiteSpace(setupInfo.AboutMe) ? null : setupInfo.AboutMe;
        user.IsSetup = true;

        await _context.SaveChangesAsync();

        return Ok(new AppUserDto(user));
    }

    [HttpPost("Edit")]
    public async Task<IActionResult> EditAccount([FromBody] UserAccountPostDto setupInfo)
    {
        AppUser? appUser = await _userManager.GetUserAsync(User);
        if (appUser == null) return Forbid();

        if (string.IsNullOrWhiteSpace(setupInfo.DisplayName)) 
            return BadRequest();

        appUser.DisplayName = setupInfo.DisplayName;
        appUser.AboutMe = string.IsNullOrWhiteSpace(setupInfo.AboutMe) ? null : setupInfo.AboutMe;
        appUser.ProfilePicturePaths = setupInfo.ProfilePicture;

        await _context.SaveChangesAsync();

        return Ok(new AppUserDto(appUser));
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUser(string userId)
    {
        AppUser? appUser = await _context.AppUsers.FirstOrDefaultAsync(x => x.Id == userId);
        if (appUser == null) return NotFound();

        return Ok(new AppUserDto(appUser));
    }
}
