using ScribbleR.Server.Models;
using System.Collections.Concurrent;

namespace ScribbleR.Server.Data;

public class SharedDb
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new();

    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}
