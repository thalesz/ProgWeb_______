function drawChart() {
    var height1 = document.getElementById("height1").value;
    var height2 = document.getElementById("height2").value;
    var height3 = document.getElementById("height3").value;
    var height4 = document.getElementById("height4").value;
    var height5 = document.getElementById("height5").value;
    var width = document.getElementById("width").value;
    var chart = document.getElementById("chart");
    chart.innerHTML = "<div class='bar' style='height:" + height1 + "px;width:" + width + "px;'></div>" +
        "<div class='bar' style='height:" + height2 + "px;width:" + width + "px;'></div>" +
        "<div class='bar' style='height:" + height3 + "px;width:" + width + "px;'></div>" +
        "<div class='bar' style='height:" + height4 + "px;width:" + width + "px;'></div>" +
        "<div class='bar' style='height:" + height5 + "px;width:" + width + "px;'></div>";
}