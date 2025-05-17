using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Models;
using ScribbleR.Server.Models.Dtos;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace ScribbleR.Server.Controllers;

public record RegisterRequest(string Email, string Password, string Handle);
public record LoginRequest(string Email, string Password);

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;

    public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest, [FromQuery] bool useCookies = false, [FromQuery] bool useSessionCookies = false)
    {
        var user = await _userManager.FindByEmailAsync(loginRequest.Email);
        if (user == null)
            return BadRequest(new { error = "Invalid email or password" });

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, lockoutOnFailure: false);
        if (!result.Succeeded)
            return BadRequest(new { error = "Invalid email or password" });

        var authProperties = new AuthenticationProperties();

        if (useCookies)
        {
            authProperties.IsPersistent = true;
            authProperties.ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30);
        }
        else if (useSessionCookies)
        {
            authProperties.IsPersistent = false;
        }
        else
        {
            authProperties.IsPersistent = false;
        }

        await _signInManager.SignInAsync(user, authProperties);

        return Ok(new { message = "Logged in successfully" });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        if (await _userManager.Users.AnyAsync(u => u.UserHandle == req.Handle))
        {
            return BadRequest(new { Error = "Handle already taken." });
        }

        var user = new AppUser { UserName = req.Email, Email = req.Email, UserHandle = req.Handle };
        var result = await _userManager.CreateAsync(user, req.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok();
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }

    [Authorize]
    [HttpGet("pingauth")]
    public async Task<IActionResult> PingAuth()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var appUser = await _userManager.FindByIdAsync(userId);

        if (appUser == null)
            return Unauthorized();

        return new JsonResult(new AppUserDto(appUser));
    }

    [HttpGet("needsregister")]
    public async Task<IActionResult> NeedsRegister([FromQuery] string email)
    {
        if (string.IsNullOrEmpty(email) || !IsValidEmail(email))
        {
            return BadRequest("Invalid email address.");
        }

        var user = await _userManager.FindByEmailAsync(email);
        return new JsonResult(new { NeedsRegister = (user == null) });
    }

    [Authorize]
    [HttpPost("changepassword")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
    {
        var context = new ValidationContext(model, null, null);
        var validationResults = new List<ValidationResult>();
        bool isValid = Validator.TryValidateObject(model, context, validationResults, true);

        if (!isValid)
        {
            var errorDict = validationResults
                .GroupBy(e => e.MemberNames.FirstOrDefault() ?? "")
                .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());
            return ValidationProblem(new ValidationProblemDetails(errorDict));
        }

        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { message = "Password changed successfully." });
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}

