using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScribbleR.Server.Data;
using ScribbleR.Server.Models;
using ScribbleR.Server.Models.Dtos;

namespace ScribbleR.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _context;

        public AccountController(ILogger<AccountController> logger, UserManager<AppUser> userManager, ApplicationDbContext context)
        {
            _logger = logger;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("Setup")]
        public async Task<IActionResult> SetupAccount([FromBody] UserAccountDto setupInfo)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return NotFound();

            if (string.IsNullOrWhiteSpace(setupInfo.DisplayName))
                return BadRequest();

            user.IsSetup = true;
            user.DisplayName = setupInfo.DisplayName;
            user.AboutMe = string.IsNullOrWhiteSpace(setupInfo.AboutMe) ? null : setupInfo.AboutMe;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> EditAccount([FromBody] UserAccountDto setupInfo)
        {
            var appUser = await _userManager.GetUserAsync(User);

            if (appUser == null)
                return NotFound();

            if (string.IsNullOrWhiteSpace(setupInfo.DisplayName))
                return BadRequest();

            appUser.DisplayName = setupInfo.DisplayName;
            appUser.AboutMe = string.IsNullOrWhiteSpace(setupInfo.AboutMe) ? null : setupInfo.AboutMe;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                appUser.Id,
                appUser.Email,
                appUser.DisplayName,
                appUser.IsSetup,
                appUser.AboutMe,
                appUser.CreatedAt,
                appUser.UpdatedAt
            });
        }
    }
}
