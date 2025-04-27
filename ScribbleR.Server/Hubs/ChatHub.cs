using Microsoft.AspNetCore.SignalR;
using ScribbleR.Server.Data;
using ScribbleR.Server.Models;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _shared;

    public ChatHub(SharedDb shared)
    {
        _shared = shared;
    }

    public async Task TestJoin(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
        await Clients.Group(conn.Chatroom).SendAsync(nameof(TestJoin), $"{conn.DisplayName} has joined {conn.Chatroom}", conn.UserId);
    }

    public async Task JoinChatroom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);

        _shared.connections[Context.ConnectionId] = conn;

        await Clients.Group(conn.Chatroom).SendAsync(nameof(JoinChatroom), conn.UserId, $"{conn.DisplayName} has joined {conn.Chatroom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection? conn))
        {
            await Clients.Group(conn.Chatroom).SendAsync(nameof(SendMessage), conn.DisplayName, msg);
        }
    }

    public async Task LeaveChatroom()
    {
        throw new NotImplementedException();
    }
}
