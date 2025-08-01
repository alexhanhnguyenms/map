namespace OpenStreetMap.Models
{
    public class Device
    {
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DeviceType Type { get; set; }

        public Device(string name, double latitude, double longitude, DeviceType type)
        {
            Name = name;
            Latitude = latitude;
            Longitude = longitude;
            Type = type;
        }
    }
}
