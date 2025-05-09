using ScribbleR.Server.Models;
using ScribbleR.Server.Models.Base;
using System.ComponentModel.DataAnnotations;

public class Friendship : BaseModel
{
    public string RequestFromUserId { get; set; }
    public AppUser RequestFromUser { get; set; }

    public string RequestToUserId { get; set; }
    public AppUser RequestToUser { get; set; }

    public FriendshipStatus Status { get; set; }
}
