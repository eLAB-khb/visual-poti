function setup() {
  createCanvas(500, 500);
}

function draw() {
  clear();
  let x = constrain(map(mouseX, 20, width, 0, 100), 0, 100);
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
  
  /*
  deg = map(x, 0, 100, 0, 125) + 55 + 90;
  p = cartesian(deg - 10, 150);
  line(50, 250 + p.y, 250 + p.x, 250 + p.y);
  line(50, 380, 150, 380);
  cy = min((415 - (250 + p.y)) / 2 + (p.y + 250), 368);
  line(50, cy - 11, 50, 250 + p.y);
  line(50, cy + 11, 50, 380);
  select("#r1").position(20, cy - 8);
  select("#r1").html("<span class='centertext'>" + (100*(x)).toK()+"&#8486;</span>");

  deg = map(x, 0, 100, 125, 250) + 55 + 90;
  p = cartesian(deg + 10, 150);
  line(450, 250 + p.y, 250 + p.x, 250 + p.y);
  line(450, 380, 350, 380);
  cy = (380 - (250 + p.y)) / 2 + (p.y + 250);
  line(450, cy - 11, 450, 250 + p.y);
  line(450, cy + 11, 450, 380);
  select("#r2").position(420, cy - 8);
  select("#r2").html("<span class='centertext'>" + (100*(100-x)).toK()+"&#8486;</span>");
*/
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

  //deg = map(x, 0, 100, 0, 125) + 55 + 90;
  //p = cartesian(deg - 10, 150);
  p = cartesian(min(max(10,a-60),240)+55+90, 220);
  select("#r1").position(p.x+225, p.y+260);

  //cy = min((415 - (250 + p.y)) / 2 + (p.y + 250), 368);
  //select("#r1").position(40, map(x,0,100,260,150));
  select("#r1").html("<span class='centertext'>" + (100*(x)).toK()+"&#8486;</span>");

  p = cartesian(min(max(0,a+60),240)+55+90, 220);

console.log(deg);
  //select("#r2").position(400, 230);
  select("#r2").position(p.x+215, p.y+260);
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