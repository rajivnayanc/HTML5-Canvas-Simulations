import Link from "next/link";
import { usePathname } from "next/navigation";

const AlgorithmVisualizer = () => {
    const pathname = usePathname();
    return (
        <center>
            <h1>Algorithm Visualizers</h1>
            <br></br>
            <br></br>
            <ul>
                <li><Link href={`${pathname}/graph-algorithms`}>Graph Algorithm</Link></li>
            </ul>
        </center>
    )
}

export default AlgorithmVisualizer;