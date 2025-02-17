import Link from "next/link";
import { usePathname } from "next/navigation";

const GraphAlgorithms = () => {
    const pathname = usePathname();
    return (
        <center>
            <h1>Graph Algorithm Visualizers</h1>
            <br></br>
            <br></br>
            <ul>
                <li><Link href={`${pathname}/minimum-cost-path`}>Minimum Cost Path</Link></li>
                <li><Link href={`${pathname}/pathfinder`}>Path Finder</Link></li>
            </ul>
        </center>
    );
}

export default GraphAlgorithms;