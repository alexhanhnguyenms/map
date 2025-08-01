var cameraIcon = L.icon({
    iconUrl: 'assets/camera.png', // Thay thế bằng đường dẫn thực tế đến biểu tượng camera
    iconSize: [32, 32], // Kích thước biểu tượng
    iconAnchor: [16, 32], // Điểm neo biểu tượng
    popupAnchor: [0, -32] // Điểm neo popup
});
// Tạo biểu tượng cho LED
var ledIcon = L.icon({
    iconUrl: 'assets/monitor.png', // Thay thế bằng đường dẫn thực tế đến biểu tượng LED
    iconSize: [32, 32], // Kích thước biểu tượng
    iconAnchor: [16, 32], // Điểm neo biểu tượng
    popupAnchor: [0, -32] // Điểm neo popup
});
var vdsIcon = L.icon({
    iconUrl: 'assets/vds.png', // Thay thế bằng đường dẫn thực tế đến biểu tượng LED
    iconSize: [32, 32], // Kích thước biểu tượng
    iconAnchor: [16, 32], // Điểm neo biểu tượng
    popupAnchor: [0, -32] // Điểm neo popup
});
//1.1 dotNetHelper

//thêm item vào bản đồ
window.ItdAddDraggableItemDrawPoint = function (itemName, type, lat, lon) {
    var icon;
    var deviceType = type.toLowerCase();
    switch (deviceType) {
        case "camera":
            icon = cameraIcon;
            break;
        case "led":
            icon = ledIcon;
            break;
        case "vds":
            icon = vdsIcon;
            break;
        default:
            console.warn("Unknown device type: " + deviceType);
            return; 
    }
    // Tạo marker và thêm vào LayerGroup của thiết bị
    var marker = L.marker([lat, lon], { icon: icon, draggable: true })
        .bindPopup(itemName)
        .addTo(window.Devices.LayerGroups[deviceType]);
    // Lưu marker và thông tin thiết bị vào danh sách
    window.Devices[deviceType + 's'].push({ name: itemName, marker: marker });
    //Sự kiện `dragend` để gửi tọa độ về Blazor khi marker được kéo
    marker.on('dragend', function (e) {
        var newLatLng = marker.getLatLng();
        window.ItdUpdateCoordinatesDeviceItem(itemName, newLatLng.lat, newLatLng.lng);

    });
    //Sự kiện click để chọn marker
    marker.on('click', function () {
        window.ItdSelectItemDeviceItem(itemName);
    });
};
//chọn và xóa item
window.ItdRemoveItemDrawPoint = function (itemName, type) {
    console.log("removeItemDrawPoint: " + itemName);
    var deviceType = type.toLowerCase();
    // Kiểm tra sự tồn tại của danh sách và LayerGroup
    if (!window.Devices[deviceType + 's'] ) {
        console.warn(`Unknown device type: ${deviceType}`);
        return;
    }
    if (!window.Devices.LayerGroups[deviceType]) {
        console.warn(`Unknown device type2: ${deviceType}`);
        return;
    }
    var deviceList = window.Devices[deviceType + 's'];
    var layerGroup = window.Devices.LayerGroups[deviceType];

    // Tìm thiết bị theo tên và xóa nếu tìm thấy
    var deviceIndex = deviceList.findIndex(device => device.name === itemName);
    if (deviceIndex !== -1) {
        var deviceMarker = deviceList[deviceIndex].marker;

        window.map.removeLayer(deviceMarker);
        layerGroup.removeLayer(deviceMarker);
        deviceList.splice(deviceIndex, 1);
    } else {
        console.warn(`Device ${itemName} of type ${deviceType} not found.`);
    }
};