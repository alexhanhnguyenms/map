window.ItdToggleDrawLine = function (drawState) {
    console.log("toggleDrawLine: " + drawState);
    window.ItdLine.isDrawing = drawState;
    if (!window.ItdLine.isDrawing && window.ItdLine.polylineDraw) {
        window.ItdLine.points = [];
        window.ItdLine.polylineDraw = null;
    }
};
function addPolylinePoint(latLng) {
    var newLine = false;
    if (window.ItdLine.points.length === 0) {
        newLine = true;
    }
    window.ItdLine.points.push(latLng);

    if (window.ItdLine.points.length >= 2) {
        if (!window.ItdLine.polylineDraw) {
            console.log("Tạo polyline mới với các điểm:", window.ItdLine.points);
            window.ItdLine.polylineDraw = L.polyline(window.ItdLine.points, { color: 'purple', weight: 15, opacity: 0.5 }).addTo(map);
        } else {
            console.log("Cập nhật polyline với các điểm mới:", window.ItdLine.points);
            window.ItdLine.polylineDraw.setLatLngs(window.ItdLine.points);
        }
    } else {
        console.log("Cần ít nhất hai điểm để vẽ một polyline.");
    }

    window.ItdDrawLineEvent(newLine, latLng.lat, latLng.lng);
}