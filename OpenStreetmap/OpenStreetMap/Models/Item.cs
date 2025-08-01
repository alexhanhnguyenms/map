namespace OpenStreetMap.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsPlacedOnMap { get; set; } = false; // Mặc định là chưa gắn
        public string Icon { get; set; } = "📷"; // Biểu tượng mặc định cho item
    }
}
