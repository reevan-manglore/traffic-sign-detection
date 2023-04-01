import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar min-h-[1.5rem] bg-primary">
            <Link to="/" className="link link-hover normal-case text-xl mx-auto font-semibold">Traffic Sign Detection System</Link>
        </div>
    )
}

export default Navbar