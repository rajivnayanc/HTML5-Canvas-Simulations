import { useEffect } from 'react';
import styles from '../styles.module.css'

let canvas;
let ctx;

const color_rgba = (r, g, b) => `rgba(${r},${g},${b})`;

let noCircles = 100;

function Circle(x, y, dx, dy, radius, col) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.col = col;
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.col;
        ctx.strokeStyle = this.col;
        ctx.fill();
        ctx.stroke();
    }

    this.update = function () {

        if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy * 0.95;
        }
        else {
            this.dy += 1;
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }

}


var circleArray = [];
const Circle_animate = (n) => {
    circleArray = [];
    for (var i = 0; i < n; i++) {
        var radius = Math.random() * 30 + 5;
        var x = Math.random() * (canvas.width - 2 * radius) + radius;
        var y = Math.random() * (canvas.height - 2 * radius) + radius;

        var velocity = 5;
        var dx = (Math.random() - 0.5) * velocity;
        var dy = 0;
        if (dx == 0)
            dx = 1;

        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        var col = color_rgba(r, g, b);
        circleArray.push(new Circle(x, y, dx, dy, radius, col));
    }
}

const animate = () => {
    setTimeout(() => {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let k = 0; k < circleArray.length; k++) {
            circleArray[k].update();
        }
    }, 1000 / 100);
}

const Simulation = () => {
    useEffect(() => {
        canvas = document.getElementById(styles.myCanvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');

        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            Circle_animate(noCircles);
        });
        animate();
        Circle_animate(noCircles);
    });
    return <canvas id={styles.myCanvas}></canvas>
}

export default Simulation;