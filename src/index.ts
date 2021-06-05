const canvas = document.getElementById('my-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const ballRadius = 10;

// paddle 정보
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy
    };

    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    };

    x += dx;
    y += dy;

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    requestAnimationFrame(draw)
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e: KeyboardEvent) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e: KeyboardEvent) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
requestAnimationFrame(draw)