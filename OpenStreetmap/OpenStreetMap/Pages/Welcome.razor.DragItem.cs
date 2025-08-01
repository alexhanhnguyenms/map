using AntDesign.JsInterop;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
using OpenStreetMap.Models;

namespace OpenStreetMap.Pages
{
    public partial class Welcome
    {
        public List<Item> Cameras { get; set; }
        private void InitItem()
        {
            // Tạo danh sách item giả lập
            Cameras = new List<Item>
            {
                new Item { Id = 1, Name = "Camera 1", Latitude = 10.762622, Longitude = 106.660172 },
                new Item { Id = 2, Name = "Camera 2", Latitude = 10.762623, Longitude = 106.660173 },
                new Item { Id = 3, Name = "Camera 3", Latitude = 10.762624, Longitude = 106.660174 }
            };
        }        

        private void StartDrag(string cameraId)
        {
            // Lưu ID camera đang kéo vào biến JavaScript
            JS.InvokeVoidAsync("setDraggedItemId", cameraId);
        }        
    }


    public class BoundingClientRect
    {
        public double Left { get; set; }
        public double Top { get; set; }
        public double Right { get; set; }
        public double Bottom { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
    }
}
