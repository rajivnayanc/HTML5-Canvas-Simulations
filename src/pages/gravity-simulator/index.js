import { useEffect } from 'react';
import styles from './styles.module.css';

const G = 6.67428 * Math.pow(10, -1);

const distFn = (A, B) => {
    return Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
}

class CelestialBody {
    x = 0;
    y = 0;
    r = 0;
    mass = 0;
    color = "#FFF";
    speed = {
        dx: 0, dy: 0
    }
    static ctx;
    static celBodies = null;
    constructor(x, y, r, dx, dy, color, mass, ctx, celBodies) {
        this.x = x; this.y = y; this.r = r;
        this.speed = { dx: dx, dy: dy };
        this.color = color;
        this.mass = mass;
        this.ctx = ctx;
        this.celBodies = celBodies;
    }

    update() {
        let relBodies = this.celBodies.filter((value) => value !== this);
        let force = { x: 0, y: 0 };
        relBodies.forEach((val) => {
            let dist = distFn(val, this);
            // if(dist>(this.r+val.r)){
            let mag = G * val.mass * this.mass / (dist * dist);
            let dir = { x: val.x - this.x, y: val.y - this.y };
            let L = Math.sqrt((dir.x * dir.x + dir.y * dir.y));
            dir.x /= L; dir.y /= L;
            force.x += mag * dir.x;
            force.y += mag * dir.y;
            // }
        });
        let acc = { x: force.x / this.mass, y: force.y / this.mass };

        // Uncomment to show net force direction and magnitude on each mass
        // ctx.save();
        // ctx.fillStyle="#F0F";
        // ctx.beginPath();
        // ctx.moveTo(this.x, this.y);
        // ctx.lineTo(this.x+force.x, this.y+force.y);
        // ctx.stroke()
        // ctx.restore();

        this.speed.dx += acc.x;
        this.speed.dy += acc.y;
        let temp = { x: 0, y: 0 };
        temp.x = this.x + this.speed.dx;
        temp.y = this.y + this.speed.dy;
        relBodies.forEach((body) => {
            if (distFn(temp, body) < (this.r + body.r)) {
                this.speed.dx = 0;
                this.speed.dy = 0;
            }
        })
        this.x += this.speed.dx;
        this.y += this.speed.dy;
    }

    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

}

function CreateBodies(canvas, ctx) {
    let celBodies = [];
    celBodies.push(new CelestialBody(canvas.width / 2 - 600, canvas.height / 2 + 100, 50, 0, 0, "#03F", Math.pow(10, 5), ctx, celBodies));
    celBodies.push(new CelestialBody(canvas.width / 2 + 600, canvas.height / 2 + 100, 70, 0, 1, "#03F", Math.pow(10, 5), ctx, celBodies));
    celBodies.push(new CelestialBody(canvas.width / 2, canvas.height / 2 - 300, 30, 0, 1, "#03F", Math.pow(11, 5), ctx, celBodies));
    celBodies.push(new CelestialBody(canvas.width / 2, canvas.height / 2 - 200, 5, 21, 0, "#FFF", Math.pow(10, 2), ctx, celBodies));
    celBodies.push(new CelestialBody(canvas.width / 2 + 500, canvas.height / 2 + 100, 5, 0, 33, "#FFF", Math.pow(10, 2), ctx, celBodies));
    celBodies.push(new CelestialBody(canvas.width / 2 - 500, canvas.height / 2 + 100, 5, 0, -30, "#FFF", Math.pow(10, 2), ctx, celBodies));
    return celBodies;
}

function updateFrame(canvas, ctx, celBodies) {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    celBodies.forEach((body) => {
        body.draw();
    });
    celBodies.forEach((body) => {
        body.update();
    });
}

const FPS = 30;
function animate(canvas, ctx, celBodies) {
    setTimeout(function(){
        requestAnimationFrame(() => animate(canvas, ctx, celBodies));
        updateFrame(canvas, ctx, celBodies);
    }, 1000 / FPS);
}

function init(canvas, ctx) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Resized");
    const celBodies = CreateBodies(canvas, ctx);
    CelestialBody.celBodies = celBodies;
    animate(canvas, ctx, celBodies);
}

const GravitySimulator = () => {
    useEffect(() => {
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        init(canvas, ctx);
        window.addEventListener('resize', () => init(canvas, ctx));
    });

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles['canvas-container']}>
                    <canvas id="myCanvas"></canvas>
                </div>
            </div>
        </div>
    );
}

export default GravitySimulator;