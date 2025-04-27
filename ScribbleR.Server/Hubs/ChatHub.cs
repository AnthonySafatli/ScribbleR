using Microsoft.AspNetCore.SignalR;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    public async Task TestJoin(string chatroom, string displayName, string userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatroom);
        await Clients.Group(chatroom).SendAsync(nameof(TestJoin), $"{displayName} has joined {chatroom}", userId);
    }

    public async Task JoinChatroom(string chatroom, string displayName, string userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatroom);
        await Clients.Group(chatroom).SendAsync(nameof(JoinChatroom), userId, $"{displayName} has joined {chatroom}");
    }

    public async Task SendMessage()
    {
        throw new NotImplementedException();
    }

    public async Task LeaveChatroom()
    {
        throw new NotImplementedException();
    }
}
