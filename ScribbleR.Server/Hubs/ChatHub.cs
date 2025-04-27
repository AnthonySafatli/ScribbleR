using Microsoft.AspNetCore.SignalR;
using ScribbleR.Server.Data;
using ScribbleR.Server.Models;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _shared;

    private const string ReceiveMessage = "ReceiveMessage";

    public ChatHub(SharedDb shared)
    {
        _shared = shared;
    }

    /*
     * 
     * ReceiveMessage Structure
     * 
     * Display Name
     * User Id
     * Message
     * IsJsoinOrLeave
     * 
     */

    public async Task JoinChatroom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
        _shared.connections[Context.ConnectionId] = conn;

        await Clients.Group(conn.Chatroom).SendAsync(nameof(JoinChatroom), conn.UserId, $"{conn.DisplayName} has joined {conn.Chatroom}"); // TODO: Remove
        await Clients.Group(conn.Chatroom).SendAsync(ReceiveMessage, conn.DisplayName, conn.UserId, "", true);
        await Clients.Group(conn.Chatroom).SendAsync("UserCount", 14); // TODO: Replace with actual count using Clients
                                                                       // TODO: Only send to the user that joined
    }

    public async Task SendMessage(string msg)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection? conn))
        {
            await Clients.Group(conn.Chatroom).SendAsync(nameof(SendMessage), conn.DisplayName, msg); // TODO: Remove
            await Clients.Group(conn.Chatroom).SendAsync(ReceiveMessage, conn.DisplayName, conn.UserId, msg, null);
        }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection? conn))
        {
            // TODO: Remove the user from the group
            await Clients.Group(conn.Chatroom).SendAsync(ReceiveMessage, conn.DisplayName, conn.UserId, "", false);
        }

        await base.OnDisconnectedAsync(exception);
    }
}
