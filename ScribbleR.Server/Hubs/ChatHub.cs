using Microsoft.AspNetCore.SignalR;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    public async Task TestJoin(string chatroom)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatroom);
        var userId = Context.UserIdentifier;

        if (userId == null) return;

        var displayName = Context.User?.FindFirst("DisplayName")?.Value;
        await Clients.Group(chatroom).SendAsync(nameof(TestJoin), $"{displayName} has joined {chatroom}", userId);
    }

    public async Task JoinChatroom(string chatroom)
    {
        throw new NotImplementedException();
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
