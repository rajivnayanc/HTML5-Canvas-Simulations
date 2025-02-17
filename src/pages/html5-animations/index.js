import Link from "next/link";
import { usePathname } from "next/navigation";

const Html5Animations = () => {
    const pathname = usePathname();
    return (
        <center>
            <h1>HTML5 Canvas Animations</h1>
            <ul>
                <li><Link href={`${pathname}/rings-of-fire`}>Rings of Fire</Link></li>
                <li><Link href={`${pathname}/shooting-stars`}>Shooting Stars</Link></li>
                <li><Link href={`${pathname}/hovering-balloons`}>Hovering Balloons</Link></li>
                <li><Link href={`${pathname}/bouncing-balls`}>Bouncing Balls</Link></li>
                <li><Link href={`${pathname}/brownian-motion`}>Brownian Motion</Link></li>
                <li><Link href={`${pathname}/colorful-spinner`}>Colorful Spinner</Link></li>
            </ul>
        </center>
    )
}

export default Html5Animations;