using ScribbleR.Server.Models;
using System.ComponentModel.DataAnnotations;

public class Friendship
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public string RequestFromUserId { get; set; }
    public AppUser RequestFromUser { get; set; }

    public string RequestToUserId { get; set; }
    public AppUser RequestToUser { get; set; }

    public FriendshipStatus Status { get; set; }
}
