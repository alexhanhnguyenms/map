//đăng ký function cho component
window.ItdRegisterCoordinateUpdater = function (dotNetHelper) {
    //1. Change coordinate
    window.ItdUpdateCoordinatesDeviceItem = function (name, lat, lng) {
        dotNetHelper.invokeMethodAsync('ItdUpdateCoordinatesDeviceItem', name, lat, lng)
            .then(() => console.log("ItdUpdateCoordinatesDeviceItem in Blazor"))
            .catch(err => console.error("Error ItdUpdateCoordinatesDeviceItem:", err));
    };
    //2.select item
    window.ItdSelectItemDeviceItem = function (name) {

        dotNetHelper.invokeMethodAsync('ItdSelectItemDeviceItem', name)
            .then(() => console.log("ItdSelectItemDeviceItem to Blazor"))
            .catch(error => console.error("Error ItdSelectItemDeviceItem item:", error));
    }
    //3.
    window.ItdDrawLineEvent = function (newLine, latitude, longitude) {

        dotNetHelper.invokeMethodAsync('ItdDrawLineEvent', newLine, latitude, longitude)
            .then(() => console.log("ItdDrawLineEvent to Blazor"))
            .catch(error => console.error("Error ItdDrawLineEvent:", error));
    }
};
//mô phỏng sự kiện giao thông
window.ItdAddEventToMap = function (eventTypes, lats, lons) {
    console.log("ItdAddEventToMap");
    window.eventLayer.clearLayers(); // Xóa tất cả các sự kiện cũ
    // Kiểm tra số lượng sự kiện, vĩ độ và kinh độ phải giống nhau
    if (eventTypes.length !== lats.length || eventTypes.length !== lons.length) {
        console.error("Số lượng sự kiện, vĩ độ và kinh độ không khớp!");
        return;
    }

    for (var i = 0; i < eventTypes.length; i++) {
        var eventType = eventTypes[i];
        var lat = lats[i];
        var lon = lons[i];
        //console.log("eventType: " + eventType + ", lat: " + lat + ", lon: " + lon);
        // Vẽ vòng tròn cho từng sự kiện
        L.circle([lat, lon], {
            color: 'red',
            radius: 50
        }).bindPopup(eventType).addTo(window.eventLayer);
    }
};