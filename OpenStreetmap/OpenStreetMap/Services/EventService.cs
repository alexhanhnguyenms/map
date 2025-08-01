using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using OpenStreetMap.Hubs;

namespace OpenStreetMap.Services
{
    public class EventService
    {
        private readonly IHubContext<MapHub> _hubContext;
        private readonly Timer _timer;

        public EventService(IHubContext<MapHub> hubContext)
        {
            _hubContext = hubContext;
            _timer = new Timer(SendRandomEvents, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
        }

        private async void SendRandomEvents(object state)
        {
            var randomCount = new Random();
            int count = randomCount.Next(5, 30);

            string[] events = new string[count];
            double[] lats = new double[count];
            double[] lons = new double[count];

            for (int i = 0; i < count; i++)
            {
                var random = new Random();
                var lat = 10.7640502 + (random.NextDouble() - 0.5) * 0.01;
                var lon = 106.7487584 + (random.NextDouble() - 0.5) * 0.01;
                lats[i] = lat;
                lons[i] = lon;
                events[i] = $"Event {(i + 1).ToString()}";
            }
            await _hubContext.Clients.All.SendAsync("ReceiveEvent", events, lats, lons);
        }
    }
}
