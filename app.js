const canvas = document.createElement('canvas');
const divClock = document.createElement('div');
const plusSize = document.createElement("button");
var ticktock = new Audio("audios/ticktock.mp3");
ticktock.muted = true;
plusSize.textContent = "+";
plusSize.setAttribute("id", "plus-size");
plusSize.setAttribute("class", "tool");
plusSize.addEventListener("click", function () {
    r = r + 5 > window.innerWidth ? window.innerWidth : r + 5;
    reConfig(x, y, r);
});
const minusSize = document.createElement("button");
minusSize.textContent = "-";
minusSize.setAttribute("id", "minus-size");
minusSize.setAttribute("class", "tool");
minusSize.addEventListener("click", function () {
    r = r - 5 > 0 ? r - 5 : 0;
    reConfig(x, y, r);
});
const maxmin = document.createElement("button");
var max = true;
maxmin.innerHTML = "<img src='images/minimize.png' />";
maxmin.setAttribute("id", "minmax");
maxmin.setAttribute("class", "tool");
maxmin.addEventListener("click", function () {
    if (max) {
        maxmin.innerHTML = "<img src='images/maximize.png' />";
        divClock.removeChild(canvas);
        resetCTX();
        ctx.clearRect(0, 0, size, size);
        oldR = r;
        reConfig(x, y, 0);
    }
    else {
        maxmin.innerHTML = "<img src='images/minimize.png' />";
        divClock.appendChild(canvas);
        r = oldR;
        reConfig(x, y, r);
    }
    max = !max;
});
const up = document.createElement("button");
up.innerHTML = "<img src='images/up.png' />";
up.setAttribute("id", "up");
up.setAttribute("class", "tool");
up.addEventListener("click", function() {
    let temp = ticktock.volume + 0.1;
    ticktock.volume = temp > 1 ? 1 : temp;
});

const down = document.createElement("button");
down.innerHTML = "<img src='images/down.png' />";
down.setAttribute("id", "down");
down.setAttribute("class", "tool");
down.addEventListener("click", function() {
    let temp = ticktock.volume - 0.1
    ticktock.volume = temp > 0 ? temp : 0;
});

const mute = document.createElement("button");
mute.innerHTML = "<img src='images/mute.png' />";
mute.setAttribute("id", "mute");
mute.setAttribute("class", "tool");
var muted = true;
mute.addEventListener("click", function() {
    muted = !muted;
    ticktock.muted = muted;
    if (muted) {
        mute.style.backgroundColor = "red";
    }
    else {
        mute.style.backgroundColor = "aqua";
    }
});

// const mute
divClock.setAttribute("id", 'clock');
divClock.setAttribute("draggable", 'true');
canvas.setAttribute("id", "canvas");
divClock.appendChild(canvas);
divClock.appendChild(plusSize);
divClock.appendChild(minusSize);
divClock.appendChild(maxmin);
divClock.appendChild(up);
divClock.appendChild(down);
divClock.appendChild(mute);
document.body.appendChild(divClock);
// Default
let x = 0;
let y = 0;
let size = 300;
let oldR;
let r = 150;
let lineBorder = 0.067 * r;
let lineHour = 0.04 * r;
let lineMinute = 0.014 * r;
let lineClockwise = 0.047 * r; 
let backColorClock = 'white';
let borderColor = 'blue'; 
let hourColor = 'black';
let minuteColor = 'orange';
let secondColor = 'blue';
canvas.setAttribute("width", size + "px");
canvas.setAttribute("height", size + "px");
divClock.setAttribute("style", "position:fixed;top:" + x + "px;left:" + y + "px;width:" + (size + 40) + "px;height:" + (size + 40) +"px;z-index:999999;");
const ctx = canvas.getContext('2d');
ctx.lineCap = 'round';
// Var
const H = 86400 / 2, M = 3600, S = 60;
let rateH, rateM, rateS;
let corner = Math.PI / 30;

// Config
function reConfig(coorX, coorY, radius) {
    x = coorX < 0 ? 0 : coorX + 2 * r + 40 > window.innerWidth ? window.innerWidth - 2 * r - 40 : coorX;
    y = coorY < 0 ? 0 : coorY + 2 * r > window.innerHeight ? window.innerHeight - 2 * r : coorY;
    size = 2 * radius;
    r = radius;

    backColorClock = 'white';
    borderColor = 'blue'; 
    hourColor = 'black';
    minuteColor = 'orange';
    secondColor = 'blue';

    lineBorder = 0.067 * r;
    lineHour = 0.04 * r;
    lineMinute = 0.014 * r;
    lineClockwise = 0.047 * r; 
    canvas.setAttribute("width", size + "px");
    canvas.setAttribute("height", size + "px");
    divClock.setAttribute("style", "position:fixed;top:" + y + "px;left:" + x + "px;width:" + (size + 40) + "px;height:" + (size + 40) +"px;z-index:999999;");
    ctx.lineCap = 'round';
    drawLine();
}

function resetCTX() {
    ctx.resetTransform();
    ctx.moveTo(0, 0);
}


function drawLine() {

    resetCTX();
    ctx.translate(r, r);
    ctx.fillStyle = backColorClock;
    ctx.beginPath();
    ctx.arc(0, 0, r - 1.5 * lineBorder, 0, Math.PI * 2);
    ctx.fill();

    resetCTX();
    ctx.lineWidth = lineBorder;
    ctx.strokeStyle = borderColor;
    ctx.beginPath();
    ctx.arc(r, r, r - lineBorder, 0, Math.PI * 2);
    ctx.stroke();

    resetCTX();
    ctx.translate(r, r);
    ctx.strokeStyle = 'black';
    for (let i = 1; i <= 60; i++) {
        ctx.rotate(corner);
        ctx.save();
        ctx.translate(0, r * 0.85);
        if (i % 5 === 0) {
            ctx.beginPath();
            ctx.lineWidth = lineHour;
            ctx.moveTo(0, - r * 0.1);
        }
        else {
            ctx.beginPath();
            ctx.lineWidth = lineMinute;
            ctx.moveTo(0, - r * 0.04);
        }
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.restore();
    }

}

drawLine();

function draw() {
    let now = new Date();
    seconds = now.getSeconds() + now.getMinutes() * 60 + now.getHours() * 3600;
    rateH = (seconds % H) / H;
    rateM = (seconds % M) / M;
    rateS = (seconds % S) / S;
    if (oldSecond != seconds) {
        oldSecond = seconds;
        if (max) {
            resetCTX();
            ctx.translate(r, r);
            ctx.fillStyle = backColorClock;
            ctx.beginPath();
            ctx.arc(0, 0, r - 2 * lineBorder - 0.2 * r, 0, Math.PI * 2);
            ctx.fill();
        
            resetCTX();
            ctx.translate(r, r);
            ctx.save();
            // Kim gi???
            ctx.lineWidth = lineClockwise;
            ctx.strokeStyle = hourColor;
            ctx.beginPath();
            ctx.rotate(rateH * 2 * Math.PI);
            ctx.moveTo(0, r * 0.12);
            ctx.lineTo(0, - r * 0.36);
            ctx.stroke();
            ctx.closePath();
        
            // X??a rotate
            ctx.restore();
            ctx.save();
        
            // Kim ph??t
            ctx.lineWidth = lineClockwise;
            ctx.strokeStyle = minuteColor;
            ctx.beginPath();
            ctx.rotate(rateM * 2 * Math.PI);
            ctx.moveTo(0, r * 0.14);
            ctx.lineTo(0, - r * 0.52);
            ctx.stroke();
            ctx.closePath();
        
            // X??a rotate
            ctx.restore();
            ctx.save();
        
            // Kim gi??y
            ticktock.play();
            ctx.lineWidth = lineClockwise;
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.rotate(rateS * 2 * Math.PI);
        
            ctx.moveTo(0, r * 0.065);
            ctx.lineTo(0, - r * 0.54);
            ctx.moveTo(0, r * 0.065);
            ctx.arc(0, r * 0.1, 0.034 * r, 0, Math.PI * 2);
            ctx.moveTo(0, - r * 0.54);
            ctx.lineTo(- r * 0.034, - r * 0.54);
            ctx.lineTo(0, - r * 0.6);
            ctx.lineTo(r * 0.034, - r * 0.54);
            ctx.lineTo(0, - r * 0.54);
            ctx.stroke();
            ctx.closePath();
        
            // X??a rotate
            ctx.restore();
        }
    }
    

    requestAnimationFrame(draw);
} 
let temp = new Date();
var oldSecond = temp.getSeconds() + temp.getMinutes() * 60 + temp.getHours() * 3600 - 1;
draw();

divClock.addEventListener("dragend", function (ev) {
    moveClock(ev);
});

function moveClock(ev) {
    var coorX = ev.clientX
    var coorY = ev.clientY
    x = coorX - r;
    y = coorY - r;
    reConfig(x, y, r)
}   
