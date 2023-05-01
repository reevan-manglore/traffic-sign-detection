import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout,loggedInStatus } from "../store/slices/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(loggedInStatus);
    const navigate = useNavigate();
    return (
        <div className="navbar min-h-[1.5rem] w-full bg-primary">
            <div className="navbar-center ml-auto">
                 <Link to="/" className="link link-hover normal-case text-xl  font-semibold ">Traffic Sign Detection System</Link>
            </div>
            
            <div className="navbar-end  ml-auto w-fit">
            {
                isLoggedIn?
                <button className="btn btn-error hover:saturate-200" onClick={()=>dispatch(logout())}>Logout</button>
                :<button className="btn  btn-success " onClick={()=>navigate("/login",{replace:true})}>Login</button>
            }
            </div>
        </div>
    )
}

export default Navbar