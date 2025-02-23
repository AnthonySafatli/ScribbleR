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
        private readonly ApplicationDbContext _context;

        public AccountController(ILogger<AccountController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost("Setup")]
        public async Task<IActionResult> SetupAccount([FromBody] SetupDto setupInfo)
        {
            var user = await _context.AppUsers.FirstOrDefaultAsync(x => x.Id == setupInfo.Id);

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
    }
}
