//机器评分
function numCanvas(num){
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var radius = 110;
  var num = num;//这一块是从后台读取的.
  //底色
  var startAngle = .7 * Math.PI;
  var endAngle = 2.3 * Math.PI;
  var counterClockwise = false;
  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = 26;
  context.strokeStyle = "#f1f2f7";
  context.lineCap = "round";
  context.stroke();
  //前景色
  var startAngle = .7 * Math.PI;
  var endAngle = (num*0.016+0.7) * Math.PI;
  var counterClockwise = false;
  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = 26;
  context.strokeStyle = "#3abffe";
  context.lineCap = "round";
  context.stroke();
  //刻度
  var line = 10;
  for(var i = 1; i<=9; i++ ){
    line = i*10;
    lineFn(line);
  }
  function lineFn(len){
    var startAngle;
    var counterClockwise = false;
    context.beginPath();
    startAngle = (line*0.016+0.7+0.03) * Math.PI;
    console.log(startAngle);
    context.arc(x, y, radius+10, startAngle, startAngle+0.02, counterClockwise);
    context.lineWidth = 6;
    context.strokeStyle = "#fff";
    context.lineCap = "butt";
    context.stroke();
  }
  //中心的数字
  context.font = "bold 60pt Calibri";
  context.textAlign = "center";
  context.fillStyle = "#3abffe";
  context.fillText(num, x, y+30);
  //左侧数字
  context.font = "18pt Calibri";
  context.textAlign = "center";
  context.fillStyle = "#c3ccda";
  context.fillText(0, 150, 248);
  //右侧数字
  context.font = "18pt Calibri";
  context.textAlign = "center";
  context.fillStyle = "#c3ccda";
  context.fillText(100, 274, 248);
}
