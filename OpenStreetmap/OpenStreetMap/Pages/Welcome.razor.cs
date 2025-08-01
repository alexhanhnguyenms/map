using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.JSInterop;
using OpenStreetMap.Models;

namespace OpenStreetMap.Pages
{    
    public partial class Welcome:IDisposable
    {
        private HubConnection? hubConnection;
        protected override async Task OnInitializedAsync()
        {            
            //connect signalr
            hubConnection = new HubConnectionBuilder()
            .WithUrl(NavigationManager.ToAbsoluteUri("/mapHub"))
                .Build();
            hubConnection.On<string[], double[], double[]>("ReceiveEvent", (eventTypes, lats, lons) =>
            {
                JS.InvokeVoidAsync("ItdAddEventToMap", eventTypes, lats, lons);
            });
            await hubConnection.StartAsync();
            //tạo danh sách item
            InitItem();
        }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                //static
                await JS.InvokeVoidAsync("ItdInitializeMap");
                //none-static thông qua dotNetHelper
                await JS.InvokeVoidAsync("ItdRegisterCoordinateUpdater", DotNetObjectReference.Create(this));               
            }
        }
        [JSInvokable("ItdReceiveCoordinates")]
        public static Task ReceiveCoordinates(double latitude, double longitude)
        {
            Console.WriteLine($"C#=>Latitude: {latitude}, Longitude: {longitude}");
            return Task.CompletedTask;
        }
        
        public void Dispose()
        {
            DisposeCoordinatesDrawPointUpdated();
        }
    }    
}
