// Countdown Timer
const countdown = () => {
  const targetDate = new Date("May 1, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = targetDate - now;

  const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
};

setInterval(countdown, 1000);

// Auto Music Play
window.addEventListener('click', () => {
  const audio = document.getElementById("bgMusic");
  if (audio && audio.paused) {
    audio.play().catch(() => {});
  }
});

// Falling Leaves Animation
const canvas = document.getElementById('fallingCanvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 1;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let leaves = [];
const leafCount = 30;

function createLeaf() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 20 + Math.random() * 20,
    speedY: 1 + Math.random() * 2,
    angle: Math.random() * Math.PI * 2,
    rotateSpeed: 0.01 + Math.random() * 0.02
  };
}

for (let i = 0; i < leafCount; i++) {
  leaves.push(createLeaf());
}

function drawLeaf(leaf) {
  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.angle);
  ctx.fillStyle = 'rgba(150, 200, 255, 0.7)';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(10, -10, 10, 10, 0, 15);
  ctx.bezierCurveTo(-10, 10, -10, -10, 0, 0);
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let leaf of leaves) {
    leaf.y += leaf.speedY;
    leaf.angle += leaf.rotateSpeed;
    if (leaf.y > canvas.height) {
      leaf.y = -20;
      leaf.x = Math.random() * canvas.width;
    }
    drawLeaf(leaf);
  }
  requestAnimationFrame(animate);
}

animate();
