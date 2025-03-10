using Microsoft.AspNetCore.SignalR;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    public async Task TestJoin(string chatroom)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatroom);
        await Clients.Group(chatroom).SendAsync(nameof(TestJoin), $"admin: Someone has joined {chatroom}");
    }
}
