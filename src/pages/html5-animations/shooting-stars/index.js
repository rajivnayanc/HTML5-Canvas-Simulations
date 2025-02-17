import { useEffect } from 'react';
import styles from './styles.module.css';

let canvas;
let container;
let ctx;
let grd;

function Stars(x, y, radius) {
    this.x = x;
    this.y = y
    this.radius = radius;

    this.draw = function () {
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.shadowBlur = 13;
        ctx.shadowColor = "white";
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    };

    this.update = function () {
        this.draw();
    };
}


function Mountain(height, count, color) {
    this.height = height;
    this.count = count;
    this.color = color;
    this.draw = function () {
        ctx.beginPath();
        var breadth = canvas.width / count;
        for (var i = 0; i < count; i++) {
            ctx.moveTo(breadth * i - 365, canvas.height);
            ctx.lineTo((breadth * i + breadth * (i + 1)) / 2, canvas.height - height);
            ctx.lineTo(breadth * (i + 1) + 365, canvas.height);
            ctx.lineTo(breadth * i, canvas.height);
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

    };

    this.update = function () {
        this.draw();
    }
}

function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = {
        x: (Math.random() - 0.5) * 15,
        y: Math.random() * 5
    };

    this.gravity = 0.8;
    this.friction = 0.8;
    this.draw = function () {
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    };

    this.update = function () {
        if ((this.x + this.radius + this.velocity.x) > canvas.width || (this.x - this.radius + this.velocity.x) < 0) {
            this.velocity.x *= -1;

        }
        else if ((this.y + this.radius + this.velocity.y) > canvas.height - 100) {
            this.velocity.y *= -1 * this.friction;
            this.shatter();
        }
        else {
            this.velocity.y += this.gravity;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    };

    this.shatter = function () {
        this.radius -= 3;
        for (var i = 0; i < 8; i++) {
            miniballs.push(new miniBall(this.x, this.y, 3));
        }
    }
}

function miniBall(x, y, radius) {
    Ball.call(this, x, y, radius);
    this.velocity = {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 15 + 5
    };

    this.gravity = 0.3;
    this.friction = 0.8;
    this.ttl = 200
    this.opacity = 1;


    this.draw = function () {
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(255,255,255," + this.opacity + ")";
        ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        this.ttl -= 1;
        this.opacity -= 1 / this.ttl;
    };

    this.update = function () {
        if ((this.x + this.radius + this.velocity.x) > canvas.width || (this.x - this.radius + this.velocity.x) < 0)
            this.velocity.x *= -1;
        else if ((this.y + this.radius + this.velocity.y) > canvas.height - 100) {
            this.velocity.y *= -1 * this.friction;
        }
        else {
            this.velocity.y += this.gravity;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    };

}


let stars;
let M1;
let M2;
let M3;
let balls;
let miniballs;
let ticker;
let random_rate = 175;

const init = () => {
    ticker = 0;
    stars = [];
    miniballs = [];
    balls = [];
    for (var i = 0; i < 100; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (canvas.width - 2 * radius) + radius;
        var y = Math.random() * (canvas.height - 2 * radius) + radius;
        stars.push(new Stars(x, y, radius));

    }

    M1 = new Mountain(canvas.height - 200, 1, "rgb(45,45,45)");
    M2 = new Mountain(canvas.height - 300, 2, "rgb(38,38,38)");
    M3 = new Mountain(canvas.height - 450, 3, "rgb(30,30,30)");
}


const animate = () => {
    setTimeout(() => {
        requestAnimationFrame(animate);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < stars.length; i++)
            stars[i].update();

        M1.update();
        M2.update();
        M3.update();

        ctx.fillStyle = "rgba(5,5,5)";
        ctx.fillRect(0, canvas.height - 100, canvas.width, canvas.height);
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].radius <= 0)
                balls.splice(i, 1);

            else
                balls[i].update();
        }


        for (var i = 0; i < miniballs.length; i++) {
            if (miniballs[i].ttl === 0) {
                miniballs.splice(i, 1);
            } else
                miniballs[i].update();

        }
        ticker++;
        if (ticker % random_rate === 0) {
            var x = Math.random() * (canvas.width - 2 * 20) + 20;
            balls.push(new Ball(x, -120, 12));

        }
    }, 1000 / 80);
}

const ShootingStars = () => {
    useEffect(() => {
        canvas = document.getElementById("myCanvas");
        container = document.getElementById(styles.container);
        ctx = canvas.getContext('2d');
        container.width = window.innerWidth;
        container.height = window.innerHeight;
        canvas.width = container.width;
        canvas.height = container.height;
        grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grd.addColorStop(0, "rgba(10,10,10)");
        grd.addColorStop(1, "rgba(40,40,40)");

        window.addEventListener('resize', () => {
            container.width = window.innerWidth;
            container.height = window.innerHeight;
            canvas.width = container.width;
            canvas.height = container.height;
            init();
        });

        canvas.addEventListener('click', () => {
            init();
        });

        init();
        animate();
    });

    return (
        <div className={styles.mainBody}>
            <div id={styles.container}>
                <canvas id="myCanvas"></canvas>
            </div>
        </div>
    );
}

export default ShootingStars;