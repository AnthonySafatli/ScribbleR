namespace ScribbleR.Server.Models.Dtos;

public class FriendshipDto
{
    public int Id { get; set; }
    public AppUserDto? User { get; set; }

    public FriendshipDto(Friendship friendship, string userId)
    {
        Id = friendship.Id;

        AppUser otherUser = friendship.RequestFromUserId == userId
            ? friendship.RequestToUser
            : friendship.RequestFromUser;
        User = new AppUserDto(otherUser);
    }
}
