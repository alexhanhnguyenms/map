using Microsoft.JSInterop;

namespace OpenStreetMap.Pages
{
    public partial class Welcome
    {
        private bool isDrawing = false;
        private async Task ToggleDrawLine()
        {
            isDrawing = !isDrawing;
            await JS.InvokeVoidAsync("ItdToggleDrawLine", isDrawing);
        }
        [JSInvokable]
        public Task ItdDrawLineEvent(bool newLine, double Latitude, double Longitude)
        {
            //selectedItem = items.FirstOrDefault(i => i.Name == name);
            //StateHasChanged();


            return Task.CompletedTask;
        }
    }
}
