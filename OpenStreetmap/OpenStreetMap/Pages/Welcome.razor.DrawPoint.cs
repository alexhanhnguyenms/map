using Microsoft.JSInterop;
using OpenStreetMap.Models;

namespace OpenStreetMap.Pages
{
    public partial class Welcome
    {
        #region draw
        //string strColor
        private List<Device> items = new();
        private Device? selectedItem;
        private int itemCount = 0;        
        private void AddItem(DeviceType deviceType)
        {

            itemCount++;
            var newItem = new Device($"{deviceType.ToString().ToUpper()} {itemCount}", 10.7640502, 106.7487584, deviceType);
            items.Add(newItem);
            JS.InvokeVoidAsync("ItdAddDraggableItemDrawPoint", newItem.Name, newItem.Type.ToString(), newItem.Latitude, newItem.Longitude);          
        }
        private async Task DeleteSelectedItemDrawPoint()
        {
            if (selectedItem != null)
            {
                items.Remove(selectedItem);
                await JS.InvokeVoidAsync("ItdRemoveItemDrawPoint", selectedItem.Name, selectedItem.Type.ToString());
                selectedItem = null;
                StateHasChanged();
            }
        }
        [JSInvokable]
        public Task ItdUpdateCoordinatesDeviceItem(string name, double latitude, double longitude)
        {
            // Cập nhật tọa độ
            //CoordinateService.UpdateCoordinatesDrawPoint(name, latitude, longitude);
            var item = items.FirstOrDefault(i => i.Name == name);
            if (item != null)
            {
                item.Latitude = latitude;
                item.Longitude = longitude;
                InvokeAsync(StateHasChanged); // Đảm bảo UI được cập nhật đúng cách
            }
            return Task.CompletedTask;
        }
        [JSInvokable]
        public Task ItdSelectItemDeviceItem(string name)
        {
            selectedItem = items.FirstOrDefault(i => i.Name == name);
            StateHasChanged();
            return Task.CompletedTask;
        }
        /// <summary>
        /// Hủy đăng ký sự kiện cập nhật draw point
        /// </summary>
        private void DisposeCoordinatesDrawPointUpdated()
        {
            
        }
        #endregion
    }
}
