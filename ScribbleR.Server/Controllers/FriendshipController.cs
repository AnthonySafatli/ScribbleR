using Microsoft.AspNetCore.Authorization;
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
public class FriendshipController : Controller
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDbContext _context;

    public FriendshipController(UserManager<AppUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetFriends()
    {
        AppUser? user = await _userManager.GetUserAsync(User);
        if (user == null) return Forbid();

        List<AppUser> friends = await _context.Friendships
            .Where(x => (x.RequestFromUserId == user.Id || x.RequestToUserId == user.Id) && x.Status == FriendshipStatus.Accepted)
            .Select(x => x.RequestFromUserId == user.Id ? x.RequestToUser : x.RequestFromUser)
            .AsNoTracking()
            .ToListAsync();

        return Ok(friends);
    }

    [HttpDelete("{friendUserId}")]
    public async Task<IActionResult> RemoveFriend(string friendUserId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Forbid();

        Friendship? friendship = await _context.Friendships.FirstOrDefaultAsync(x =>
            (x.RequestFromUserId == user.Id && x.RequestToUserId == friendUserId ||
             x.RequestFromUserId == friendUserId && x.RequestToUserId == user.Id)
            && x.Status == FriendshipStatus.Accepted);
        if (friendship == null) return NotFound();

        _context.Friendships.Remove(friendship);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("Requests")]
    public async Task<IActionResult> SendFriendRequest([FromBody] FriendRequestDto request)
    {
        AppUser? currUser = await _userManager.GetUserAsync(User);
        if (currUser == null) return Forbid();

        AppUser? targetUser = null;

        if (!string.IsNullOrEmpty(request.UserId))
            targetUser = await _userManager.FindByIdAsync(request.UserId);
        else if (!string.IsNullOrEmpty(request.Username))
            targetUser = await _userManager.FindByNameAsync(request.Username);

        if (targetUser == null)
            return NotFound("User not found.");

        if (targetUser.Id == currUser.Id)
            return BadRequest("Cannot send a friend request to yourself.");

        Friendship? existingRequest = await _context.Friendships.FirstOrDefaultAsync(x =>
            (x.RequestFromUserId == currUser.Id && x.RequestToUserId == targetUser.Id) ||
            (x.RequestFromUserId == targetUser.Id && x.RequestToUserId == currUser.Id));

        if (existingRequest != null)
            return BadRequest("Friend request already exists.");

        Friendship newFriendship = new()
        {
            RequestFromUserId = currUser.Id,
            RequestToUserId = targetUser.Id,
            Status = FriendshipStatus.Pending
        };

        _context.Friendships.Add(newFriendship);
        await _context.SaveChangesAsync();

        return Ok(newFriendship);
    }


    [HttpGet("Requests/Received")]
    public async Task<IActionResult> GetReceivedRequests()
    {
        AppUser? user = await _userManager.GetUserAsync(User);
        if (user == null) return Forbid();

        List<Friendship> requests = await _context.Friendships
            .Where(x => x.RequestToUserId == user.Id && x.Status == FriendshipStatus.Pending)
            .Include(x => x.RequestFromUser)
            .AsNoTracking()
            .ToListAsync();

        return Ok(requests);
    }

    [HttpGet("Requests/Sent")]
    public async Task<IActionResult> GetSentRequests()
    {
        AppUser? user = await _userManager.GetUserAsync(User);
        if (user == null) return Forbid();

        List<Friendship> requests = await _context.Friendships
            .Where(x => x.RequestFromUserId == user.Id && x.Status == FriendshipStatus.Pending)
            .Include(x => x.RequestToUser)
            .AsNoTracking()
            .ToListAsync();

        return Ok(requests);
    }

    [HttpPost("Requests/{requestId}/Accept")]
    public async Task<IActionResult> AcceptFriendRequest(int requestId)
    {
        AppUser? currUser = await _userManager.GetUserAsync(User);
        if (currUser == null) return Forbid();

        Friendship? friendship = await _context.Friendships.FirstOrDefaultAsync(x => x.Id == requestId);
        if (friendship == null) return NotFound();

        if (friendship.RequestToUserId != currUser.Id) 
            return Forbid();

        friendship.Status = FriendshipStatus.Accepted;

        await _context.SaveChangesAsync();
        return Ok(friendship);
    }

    [HttpPost("Requests/{requestId}/Reject")]
    public async Task<IActionResult> RejectFriendRequest(int requestId)
    {
        AppUser? currUser = await _userManager.GetUserAsync(User);
        if (currUser == null) return Forbid();

        Friendship? friendship = await _context.Friendships.FirstOrDefaultAsync(x => x.Id == requestId);
        if (friendship == null) return NotFound();

        if (friendship.RequestToUserId != currUser.Id) 
            return Forbid();

        friendship.Status = FriendshipStatus.Rejected;

        await _context.SaveChangesAsync();
        return Ok(friendship);
    }

    [HttpDelete("Requests/{requestId}")]
    public async Task<IActionResult> CancelRequest(int requestId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Forbid();

        Friendship? friendship = await _context.Friendships.FindAsync(requestId);
        if (friendship == null) return NotFound();

        if (friendship.RequestFromUserId != user.Id) 
            return Forbid();

        if (friendship.Status != FriendshipStatus.Pending) 
            return BadRequest();

        _context.Friendships.Remove(friendship);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
