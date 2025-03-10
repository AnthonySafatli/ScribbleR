using Microsoft.AspNetCore.SignalR;
using ScribbleR.Server.Models;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    public async Task TestJoin(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
        await Clients.Group(conn.ChatRoom).SendAsync(nameof(TestJoin), "admin", "Someone has joined");
    }
}
