using Microsoft.AspNetCore.SignalR;

namespace ScribbleR.Server.Hubs;

public class ChatHub : Hub
{
    public async Task TestJoin(string chatroom)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatroom);
        await Clients.Group(chatroom).SendAsync(nameof(TestJoin), $"admin: Someone has joined {chatroom}");
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
