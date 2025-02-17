import { useEffect } from 'react';
import styles from '../styles.module.css'


let canvas;
let ctx;

const color_rgba = (r, g, b) => `rgba(${r},${g},${b})`;

let mouse = {
    x: undefined,
    y: undefined
}

let noCircles = 300;

const distance_eu = (x1, y1, x2, y2) => {
    let x_d = x2 - x1;
    let y_d = y2 - y1;
    return (Math.sqrt(Math.pow(x_d, 2) + Math.pow(y_d, 2)));
}

const rotate = (velocity, angle) => {
    const r_V = {
        dx: velocity.dx * Math.cos(angle) - velocity.dy * Math.sin(angle),
        dy: velocity.dx * Math.sin(angle) + velocity.dy * Math.cos(angle)
    };

    return r_V;
}

const resolve_velocity = (P1, P2) => {

    const x_vd = P1.velocity.dx - P2.velocity.dx;
    const y_vd = P1.velocity.dy - P2.velocity.dy;

    const x_d = P2.x - P1.x;
    const y_d = P2.y - P1.y;

    if ((x_vd * x_d + y_vd * y_d) >= 0) {

        const angle = -Math.atan2(P2.y - P1.y, P2.x - P1.x);

        var m1 = P1.mass;
        var m2 = P2.mass;

        const u1 = rotate(P1.velocity, angle);
        const u2 = rotate(P2.velocity, angle);

        const v1 = { dx: (u1.dx * (m1 - m2)) / (m1 + m2) + (u2.dx * 2 * m2) / (m1 + m2), dy: u1.dy };
        const v2 = { dx: (u2.dx * (m1 - m2)) / (m1 + m2) + (u1.dx * 2 * m2) / (m1 + m2), dy: u2.dy };

        const vF1 = rotate(v1, -angle);
        const vF2 = rotate(v2, -angle);

        P1.velocity.dx = vF1.dx;
        P1.velocity.dy = vF1.dy;

        P2.velocity.dx = vF2.dx;
        P2.velocity.dy = vF2.dy;
    }

}

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
    this.opacity = 0;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.col;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = this.col;
        ctx.stroke();
        ctx.closePath();
    }

    this.update = function (particles) {
        this.draw();
        for (let j = 0; j < particles.length; j++) {
            if (this === particles[j]) continue;

            if (distance_eu(this.x, this.y, particles[j].x, particles[j].y) - this.radius * 2 < 0) {
                resolve_velocity(this, particles[j]);

            }
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.velocity.dx = -this.velocity.dx;
        }

        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
            this.velocity.dy = -this.velocity.dy;
        }
        if (distance_eu(this.x, this.y, mouse.x, mouse.y) < 100 && this.opacity < 0.5) {
            this.opacity += 0.2;
        }
        else if (this.opacity > 0) {
            this.opacity -= 0.2;
            this.opacity = Math.max(0, this.opacity);
        }
        this.x += this.velocity.dx;
        this.y += this.velocity.dy;
    }
}


let particles = [];

const init = (n) => {
    particles = [];
    for (var i = 0; i < n; i++) {
        var radius = 15;

        var x = Math.random() * (canvas.width - 2 * radius) + radius;
        var y = Math.random() * (canvas.height - 2 * radius) + radius;
        if (i !== 0) {
            for (var j = 0; j < particles.length; j++) {
                if (distance_eu(x, y, particles[j].x, particles[j].y) < 2 * radius) {
                    x = Math.random() * (canvas.width - 2 * radius) + radius;
                    y = Math.random() * (canvas.height - 2 * radius) + radius;
                    j = -1;
                }
            }
        }
        var velocity = 3;
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
        particles.push(new Particle(x, y, dx, dy, radius, col));
    }
}

const animate = () => {
    setTimeout(() => {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let k = 0; k < particles.length; k++) {
            particles[k].update(particles);
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
            init(noCircles);s
        });
        window.addEventListener('click', function () {
            init(noCircles);
        });

        init(noCircles);
        animate();
    });
    return <canvas id={styles.myCanvas}></canvas>
}

export default Simulation;