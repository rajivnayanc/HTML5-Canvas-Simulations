import { useEffect } from 'react';
import styles from '../styles.module.css'

let canvas;
let ctx;
let mouse = {
    x: undefined,
    y: undefined
}
let noCircles = 50;

const color_rgba = (r, g, b) => `rgba(${r},${g},${b})`;

function Particle(x, y, dx, dy, radius, col) {
    this.x = x;
    this.y = y;
    this.velocity = {
        dx: dx,
        dy: dy
    };

    this.mass = 1;
    this.radius = radius;
    this.minRadius = radius;
    this.col = col;
    this.opacity = 1;
    this.velocity = 0.03;
    this.radians = Math.random() * Math.PI * 2;
    this.distFromCenter = Math.random() * (200 - 100) + 100;
    this.lastMouseP = { x: x, y: y };

    this.draw = (lastP) => {
        ctx.beginPath();
        ctx.strokeStyle = this.col;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastP.x, lastP.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.update = () => {
        const lastP = { x: this.x, y: this.y };
        const perc = 0.1;
        this.lastMouseP.x += (mouse.x - this.lastMouseP.x) * perc;
        this.lastMouseP.y += (mouse.y - this.lastMouseP.y) * perc;

        this.x = this.lastMouseP.x + Math.cos(this.radians) * this.distFromCenter;
        this.y = this.lastMouseP.y + Math.sin(this.radians) * this.distFromCenter;
        this.radians += this.velocity;
        this.draw(lastP);

    }

}

let particles = [];
const init = (n) => {
    particles = [];
    for (let i = 0; i < n; i++) {
        let radius = Math.random() * 3 + 1;
        let x = canvas.width / 2;
        let y = canvas.height / 2;

        let velocity = 3;
        let dx = (Math.random() - 0.5) * velocity;
        let dy = (Math.random() - 0.5) * velocity;

        if (dx == 0)
            dx = 1;
        if (dy == 0)
            dy = 1;

        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);

        let col = color_rgba(r, g, b);

        particles.push(new Particle(x, y, dx, dy, radius, col));

    }
}

const animate = () => {
    setTimeout(() => {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
    }, 8);

}

const Simulation = () => {
    useEffect(() => {
        canvas = document.getElementById(styles.myCanvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');
        mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }
        window.addEventListener('mousemove', function (event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            init(noCircles);
        });

        window.addEventListener('click', function () {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            init(noCircles);
        });

        init(noCircles);
        animate();
    });
    return <canvas id={styles.myCanvas}></canvas>
}

export default Simulation;