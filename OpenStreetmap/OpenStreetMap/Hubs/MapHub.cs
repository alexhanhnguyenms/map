using Microsoft.AspNetCore.SignalR;

namespace OpenStreetMap.Hubs
{
    public class MapHub : Hub
    {
        public async Task SendEvent(string[] eventType, double[] lat, double[] lon)
        {
            await Clients.All.SendAsync("ReceiveEvent", eventType, lat, lon);
        }
    }
}
