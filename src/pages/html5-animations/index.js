import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

const Html5Animations = () => {
    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>HTML5 Canvas Animations</h1>
            <div className={styles.grid}>
                <Link href={`${pathname}/rings-of-fire`} className={styles.card}>
                    <h3>Rings of Fire</h3>
                </Link>
                <Link href={`${pathname}/shooting-stars`} className={styles.card}>
                    <h3>Shooting Stars</h3>
                </Link>
                <Link href={`${pathname}/hovering-balloons`} className={styles.card}>
                    <h3>Hovering Balloons</h3>
                </Link>
                <Link href={`${pathname}/bouncing-balls`} className={styles.card}>
                    <h3>Bouncing Balls</h3>
                </Link>
                <Link href={`${pathname}/brownian-motion`} className={styles.card}>
                    <h3>Brownian Motion</h3>
                </Link>
                <Link href={`${pathname}/colorful-spinner`} className={styles.card}>
                    <h3>Colorful Spinner</h3>
                </Link>
            </div>
        </div>
    )
}

export default Html5Animations;