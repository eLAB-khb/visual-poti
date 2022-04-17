let x =0 ;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvascontainer");

}

function draw() {
  clear();
  let a = map(x, 0, 100, 0, 250);

  select("#poti-top").style("transform", "rotate(" + a + "deg");
  let drop = cartesian(-a + 50, 3);
  let drop_filter = "drop-shadow( " + drop.x + "px " + drop.y + "px 2px rgba(0, 0, 0, .5))";
  select("#poti-top").style("-webkit-filter", drop_filter);
  select("#poti-top").style("filter", drop_filter);

  let v = divideVoltage(100 - x, x, 5.0).toFixed(2);
  select("#vout").html("<span class='centertext'>" + v + "V</span>");

  stroke(75);
  let deg, p, cy;
  
  noFill();
  stroke(255, 200, 0,127);
  strokeWeight(5);
//  strokeCap(SQUARE);

  if (x < 99)
    arc(250, 250, 320, 320, radians(145 + a + 2), radians(35), OPEN);
    line();
    stroke(255, 50, 200, 100);
  if (x > 1)
    arc(250, 250, 320, 320, radians(145), radians(145 + a - 2), OPEN);

  let margin = (windowWidth-500)/2;

  p = cartesian(min(max(10,a-60),240)+55+90, 220);
  select("#r1").position(margin+p.x+200, p.y+260);
  select("#r1").html("<span class='centertext'>" + (100*(x)).toK()+"&#8486;</span>");

  p = cartesian(min(max(0,a+60),240)+55+90, 220);
  select("#r2").position(margin+p.x+200, p.y+260);
  select("#r2").html("<span class='centertext'>" + (100*(100-x)).toK()+"&#8486;</span>");
}

function divideVoltage(rH, rL, vIn) {
  return vIn * (rL / (rH + rL));
}

function cartesian(angle, radius) {
  return {
    x: radius * cos(radians(angle)),
    y: radius * sin(radians(angle)),
  };
}

Number.prototype.toK = function () {
  if (this > 1000) return (this / 1000).toPrecision(2) + " K";
  else return round(this)+" ";
};

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  x += event.delta;
  x = constrain(x, 0, 100);
}
