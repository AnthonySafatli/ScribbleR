using Microsoft.AspNetCore.SignalR;
using ScribbleR.Server.Data;
using ScribbleR.Server.Models;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _shared;

    private const string ReceiveMessage = "ReceiveMessage";
    private const string ReceiveSketch = "ReceiveSketch";
    private const string UserCount = "UserCount";

    public ChatHub(SharedDb shared)
    {
        _shared = shared;
    }

    public async Task JoinChatroom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
        _shared.connections[Context.ConnectionId] = conn;

        await Clients.Group(conn.Chatroom).SendAsync(ReceiveMessage, conn.DisplayName, conn.UserId, "", true, DateTime.Now);

        int userCount = _shared.connections.Count(c => c.Value.Chatroom == conn.Chatroom);
        await Clients.Group(conn.Chatroom).SendAsync(UserCount, userCount);

    }

    public async Task SendMessage(string msg, long timestamp)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection? conn))
        {
            DateTime dateTime = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).UtcDateTime;
            await Clients.Group(conn.Chatroom).SendAsync(ReceiveMessage, conn.DisplayName, conn.UserId, msg, null, dateTime);
        }
    }

    public async Task SendSketch(CanvasPath[] paths, long timestamp)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection? conn))
        {
            DateTime dateTime = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).UtcDateTime;
            await Clients.Group(conn.Chatroom).SendAsync(ReceiveSketch, conn.DisplayName, conn.UserId, paths, dateTime);
        }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection? conn))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, conn.Chatroom);
            _shared.connections.TryRemove(Context.ConnectionId, out _);

            await Clients.Group(conn.Chatroom).SendAsync(ReceiveMessage, conn.DisplayName, conn.UserId, "", false, DateTime.Now);

            int userCount = _shared.connections.Count(c => c.Value.Chatroom == conn.Chatroom);
            await Clients.Group(conn.Chatroom).SendAsync(UserCount, userCount);
        }

        await base.OnDisconnectedAsync(exception);
    }
}
