import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

const GraphAlgorithms = () => {
    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Graph Algorithm Visualizers</h1>
            <div className={styles.grid}>
                <Link href={`${pathname}/minimum-cost-path`} className={styles.card}>
                    <h3>Minimum Cost Path</h3>
                </Link>
                <Link href={`${pathname}/pathfinder`} className={styles.card}>
                    <h3>Path Finder</h3>
                </Link>
            </div>
        </div>
    );
}

export default GraphAlgorithms;