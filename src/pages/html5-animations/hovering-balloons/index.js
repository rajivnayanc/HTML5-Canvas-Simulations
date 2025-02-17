import { useEffect } from 'react';
import styles from '../styles.module.css'


let canvas;
let ctx;

const color_rgba = (r, g, b) => `rgba(${r},${g},${b})`;

let mouse = {
    x: undefined,
    y: undefined
}

let noCircles = 500;
let maxRadius = 45;

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
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            && this.radius < maxRadius
        ) {
            this.radius += 1;
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }

}


var circleArray = [];

const Circle_animate = (n) => {
    circleArray = [];
    for (var i = 0; i < n; i++) {
        var radius = Math.random() * 5 + 3;
        var x = Math.random() * (canvas.width - 2 * radius) + radius;
        var y = Math.random() * (canvas.height - 2 * radius) + radius;

        var velocity = 5;
        var dx = (Math.random() - 0.5) * velocity;
        var dy = (Math.random() - 0.5) * velocity;
        if (dx == 0)
            dx = 1;
        if (dy == 0)
            dy = 1;

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
    }, 5);
}

const Simulation = () => {
    useEffect(() => {
        canvas = document.getElementById(styles.myCanvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');

        window.addEventListener('mousemove', function (event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });
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