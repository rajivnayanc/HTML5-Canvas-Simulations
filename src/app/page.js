import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <center>
      <h1>HTML5 Canvas Simulations</h1>
      <br></br>
      <br></br>
      <ul>
        <li><Link href="/algorithm-visualizer">Algorithm Visualizers</Link></li>
        <li><Link href="/html5-animations">HTML5 Animations</Link></li>
        <li><Link href="/gravity-simulator">Planetery Gravity Simulation</Link></li>
        <li><Link href="/pendulum-simulator">Pendulum Simulation</Link></li>
      </ul>
    </center>
  )
}
