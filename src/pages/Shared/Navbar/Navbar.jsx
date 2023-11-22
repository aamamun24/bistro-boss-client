import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin()
    const [cart] = useCart()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err.message))
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
        <li><NavLink to="/order/salad">Order Food</NavLink></li>
        {
            user && isAdmin && <li><NavLink to="/dashboard/adminHome">Dashboard</NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to="/dashboard/userHome">Dashboard</NavLink></li>
        }
        <li><NavLink to="/dashboard/cart">
            <div className="flex gap-2 items-center">
                <FaShoppingCart />
                <div className="badge badge-secondary">{cart.length}</div>
            </div>
        </NavLink></li>
        {
            user ?
                <>
                    <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
                </>
                :
                <li><NavLink to="/login">Login</NavLink></li>
        }
    </>

    return (
        <div className="navbar fixed bg-black bg-opacity-25 z-20 text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;