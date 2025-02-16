import Link from "next/link";
import { usePathname } from "next/navigation";

const AlgorithmVisualizer = () => {
    const pathname = usePathname();
    return (
        <ul>
            <li><Link href={`${pathname}/graph-algorithms`}>Graph Algorithm</Link></li>
        </ul>
    )
}

export default AlgorithmVisualizer;