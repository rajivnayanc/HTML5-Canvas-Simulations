import styles from './styles.module.css'

const RingsOfFire = () => {
    return (
    <div className={styles.mainBody}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <svg className={styles.svg}>
            <filter id="wavy">
                <feTurbulence x="0" y ="0" baseFrequency="0.009" numOctaves="5" seed="2">
                    <animate attributeName="baseFrequency" dur="60s" values="0.002;0.1;0.002" repeatCount="indefinite">
                    </animate>
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
            </filter>
        </svg>
        </div>
    );
}

export default RingsOfFire;