import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

let pendulumSimulator;
let ctx;
let ORIGIN = {
    x: 0,
    y: 10
}

const g = 0.1;
let ropeL = 400;
let damp = 1;

const normalize = (vec) => {
    const lenT = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    vec.x /= lenT;
    vec.y /= lenT;
    return vec
}

const toRadian = (deg) => {
    return deg * Math.PI / 180;
}

const rotate = (theta, point, centre) => {
    let s = Math.sin(theta);
    let c = Math.cos(theta);
    point.x -= centre.x;
    point.y -= centre.y;
    // rotate point
    let xnew = point.x * c - point.y * s;
    let ynew = point.x * s + point.y * c;

    // translate point back:
    point.x = xnew + centre.x;
    point.y = ynew + centre.y;

    return point;
}

class Ball {
    x = 0;
    y = 0;
    r = 0;
    color = "#0000FF";
    theta = 60;
    speed = 0;
    speedDir = {
        x: 0, y: 0
    }
    constructor(x, y, r, theta, color, speed) {
        this.theta = toRadian(theta);
        let out = rotate(this.theta, { x: ORIGIN.x, y: ORIGIN.y + ropeL }, ORIGIN);
        this.x = out.x;
        this.y = out.y;
        this.r = r;
        this.color = color;
        this.speed = speed;
    }

    update() {
        // Acceleration due to gravity

        // Tension due to string from position of hanging
        let T = {
            x: ORIGIN.x - this.x,
            y: ORIGIN.y - this.y,
            z: 0
        }

        // Normalization of Tension Direction
        T = normalize(T);

        // Net Acceleration Direction V = Tx(k)
        // cx = ay x bz − az x by
        // cy = az x bx − ax x bz
        // cz = ax x by − ay x bx
        const temp = {
            x: 0, y: 0, z: 1
        };
        let V = {
            x: T.y * temp.z - T.z * temp.y,
            y: T.z * temp.x - T.x * temp.z
        };
        V = normalize(V);

        // Net accelaration = F . V = -g*V.y (In this case, +y goes down, that's why positive)
        let temp2 = g * V.y;
        V.x *= temp2;
        V.y *= temp2;

        // Update the speed in direction of acceleration
        this.speed += temp2;
        this.speedDir.x = V.x;
        this.speedDir.y = V.y;
        this.speed *= damp
        // Obtain angular velocity w = speed/radius
        let w = this.speed / ropeL;

        // Increase the angle in direction of angular velocity and obtain the point
        // after rotating that much angle.
        this.theta += w;
        let out = rotate(this.theta, { x: ORIGIN.x, y: ORIGIN.y + ropeL }, ORIGIN);
        this.x = out.x;
        this.y = out.y;


    }

    draw() {
        //Draw the Rope from centre of ball to hinge
        ctx.save();
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(ORIGIN.x, ORIGIN.y);
        ctx.stroke()
        ctx.restore();

        //Draw the ball
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        // Draw the direction of acceleration
        ctx.save();
        ctx.strokeStyle = "#444";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 100 * this.speedDir.x, this.y + 100 * this.speedDir.y);
        ctx.stroke()
        ctx.restore();

        //Draw hinge point
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#CCC";
        ctx.arc(ORIGIN.x, ORIGIN.y, 10, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

}
let pendulum;

const FPS = 1000;
let timeoutvar;
let objectClicked = false;
let originClicked = false;
function animate() {
    timeoutvar = setTimeout(() => {
        requestAnimationFrame(animate);
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, pendulumSimulator.width, pendulumSimulator.height);
        pendulum.draw();
        if (!objectClicked)
            pendulum.update();
        clearTimeout(timeoutvar)
    }, 1000 / FPS);
}
const init = () => {
    if (timeoutvar) clearTimeout(timeoutvar);
    pendulumSimulator = document.getElementById(styles.pendulumSimulator);
    ctx = pendulumSimulator.getContext('2d');
    pendulumSimulator.width = window.innerWidth;
    pendulumSimulator.height = window.innerHeight;
    ORIGIN = {
        x: pendulumSimulator.width / 2,
        y: 10
    }
    ropeL = 400;
    damp = 1;
    pendulum = new Ball(100, 200, 75, -60, "#FF00FF", 0);
    animate();
}

const PendulumSimulator = () => {
    useEffect(() => {
        init();
        window.addEventListener('resize', init)
        window.addEventListener('mousedown', (e) => {
            if (pendulum) {
                let x = e.clientX;
                let y = e.clientY;
                let a = (pendulum.x - x) * (pendulum.x - x) + (pendulum.y - y) * (pendulum.y - y);
                if (a <= (pendulum.r * pendulum.r))
                    objectClicked = true;

                a = (ORIGIN.x - x) * (ORIGIN.x - x) + (ORIGIN.y - y) * (ORIGIN.y - y);
                if (a <= (100))
                    originClicked = true;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (pendulum) {
                if (objectClicked) {
                    let x = e.clientX;
                    let y = e.clientY;
                    pendulum.x = x;
                    pendulum.y = y;
                    ropeL = Math.sqrt((ORIGIN.x - x) * (ORIGIN.x - x) + (ORIGIN.y - y) * (ORIGIN.y - y));
                    pendulum.speed = 0;
                    pendulum.speedDir = { x: 0, y: 0 };
                    let TDir = {
                        x: x - ORIGIN.x,
                        y: y - ORIGIN.y
                    }
                    TDir = normalize(TDir);
                    ctx.save();
                    ctx.strokeStyle = "#444";
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + 100 * TDir.x, y + 100 * TDir.y);
                    ctx.stroke()
                    ctx.restore();
                    pendulum.theta = Math.acos(TDir.y);
                    if (x > ORIGIN.x) pendulum.theta *= -1;
                }
                if (originClicked) {
                    let x = e.clientX;
                    let y = e.clientY;
                    ORIGIN.x = x;
                    ORIGIN.y = y;
                    // ropeL = Math.sqrt((ORIGIN.x-pendulum.x)*(ORIGIN.x-pendulum.x) + (ORIGIN.y-pendulum.y)*(ORIGIN.y-pendulum.y));
                    let TDir = {
                        x: pendulum.x - x,
                        y: pendulum.y - y
                    }

                    TDir = normalize(TDir);
                    pendulum.theta = Math.acos(TDir.y);
                    if (pendulum.x > ORIGIN.x) pendulum.theta *= -1;
                }
            }
        })

        window.addEventListener('mouseup', (e) => {
            if (pendulum) {
                objectClicked = false;
                originClicked = false;
            }
        });
    });
    const dampValueRef = useRef(1);
    const applyFriction = () => {
        damp = dampValueRef.current.value;
    }
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles["col-canvas"]}>
                    <button id={styles.reset} onClick={init}>RESET</button>
                    <input id={styles.dampValue} ref={dampValueRef} type="number" min="0" max="1" step="0.01" placeholder='friction u' />
                    <button id={styles.applyFriction} onClick={applyFriction}>Apply Friction</button>
                    <canvas id={styles.pendulumSimulator}></canvas>
                </div>
            </div>
        </div>
    );
}

export default PendulumSimulator;