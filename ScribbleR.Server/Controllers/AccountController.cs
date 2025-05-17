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

    [HttpPost("Edit")]
    public async Task<IActionResult> EditAccount([FromBody] UserAccountPostDto accountInfo)
    {
        AppUser? appUser = await _userManager.GetUserAsync(User);
        if (appUser == null) return Forbid();

        appUser.DisplayName = accountInfo.DisplayName;
        appUser.AboutMe = string.IsNullOrWhiteSpace(accountInfo.AboutMe) ? null : accountInfo.AboutMe;
        appUser.ProfilePicturePaths = accountInfo.ProfilePicture;

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
