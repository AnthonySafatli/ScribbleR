using Microsoft.AspNetCore.SignalR;
using ScribbleR.Server.Models;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    public async Task TestJoin(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
        await Clients.Group(conn.Chatroom).SendAsync(nameof(TestJoin), $"{conn.DisplayName} has joined {conn.Chatroom}", conn.UserId);
    }

    public async Task JoinChatroom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
        await Clients.Group(conn.Chatroom).SendAsync(nameof(JoinChatroom), conn.UserId, $"{conn.DisplayName} has joined {conn.Chatroom}");
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
