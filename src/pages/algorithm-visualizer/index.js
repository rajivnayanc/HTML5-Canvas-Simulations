import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

const AlgorithmVisualizer = () => {
    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Algorithm Visualizers</h1>
            <div className={styles.grid}>
                <Link href={`${pathname}/graph-algorithms`} className={styles.card}>
                    <h3>Graph Algorithm</h3>
                </Link>
            </div>
        </div>
    )
}

export default AlgorithmVisualizer;