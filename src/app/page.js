import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>Awesome Simulations</h1>
        <p className={styles.subtitle}>
          A collection of awesome simulations, animations, and experiments.
        </p>
      </div>

      <div className={styles.grid}>
        <Link href="/algorithm-visualizer" className={styles.card}>
          <h2>Algorithm Visualizers &rarr;</h2>
          <p>Watch sorting algorithms and pathfinding in action.</p>
        </Link>

        <Link href="/html5-animations" className={styles.card}>
          <h2>HTML5 Animations &rarr;</h2>
          <p>Explore a variety of creative canvas animations.</p>
        </Link>

        <Link href="/gravity-simulator" className={styles.card}>
          <h2>Planetary Gravity &rarr;</h2>
          <p>Simulate the gravitational pull between celestial bodies.</p>
        </Link>

        <Link href="/pendulum-simulator" className={styles.card}>
          <h2>Pendulum Simulator &rarr;</h2>
          <p>Observe the motion of a simple pendulum.</p>
        </Link>
      </div>
    </main>
  );
}
