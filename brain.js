const canvas = document.getElementById('brain-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 120;

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.angle = Math.random()*2*Math.PI;
    this.radius = Math.random()*200 + 50;
    this.speed = Math.random()*0.02 + 0.01;
  }
  update() {
    this.angle += this.speed;
    this.x = canvas.width/2 + Math.cos(this.angle)*this.radius;
    this.y = canvas.height/2 + Math.sin(this.angle)*this.radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI*2);
    ctx.fillStyle = 'cyan';
    ctx.fill();
  }
}

for (let i=0; i<numParticles; i++){
  particles.push(new Particle());
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

animate();