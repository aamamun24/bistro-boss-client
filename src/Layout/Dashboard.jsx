import { FaBook, FaCalendar, FaCalendarCheck, FaHome, FaListUl, FaMailBulk, FaPaypal, FaShoppingBag, FaShoppingCart, FaStar, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()

    // get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="grid grid-cols-5">
            {/* Dashboard side bar */}
            <div className="min-h-screen  p-4 col-span-1 bg-orange-300">
                <h2 className="text-3xl ml-4 font-bold">Bistro Boss <br /> <span className="text-xl">Restaurant</span></h2>
                <ul className="menu text-lg">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome" className="flex gap-2 items-center"> <FaHome></FaHome>Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems" className="flex gap-2 items-center"> <FaUtensils></FaUtensils> Add Item
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems" className="flex gap-2 items-center"> <FaListUl></FaListUl> Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings" className="flex gap-2 items-center"> <FaBook></FaBook> Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users" className="flex gap-2 items-center"> <FaUsers></FaUsers> All User
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome" className="flex gap-2 items-center"> <FaHome></FaHome>User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation" className="flex gap-2 items-center"> <FaCalendar></FaCalendar>Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory" className="flex gap-2 items-center"> <FaPaypal></FaPaypal> Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart" className="flex gap-2 items-center"> <FaShoppingCart></FaShoppingCart>My Cart <span className="text-red-600">({cart.length})</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review" className="flex gap-2 items-center"> <FaStar></FaStar>Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings" className="flex gap-2 items-center"> <FaCalendarCheck></FaCalendarCheck>My Booking
                                    </NavLink>
                                </li>
                            </>
                    }

                    {/* common navbar */}
                    <div className="divider"></div>
                    <li><NavLink to="/" className="flex gap-2 items-center"> <FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/menu" className="flex gap-2 items-center"> <FaListUl></FaListUl> Menu</NavLink></li>
                    <li><NavLink to="/shop" className="flex gap-2 items-center"> <FaShoppingBag></FaShoppingBag>Shop</NavLink></li>
                    <li><NavLink to="/shop" className="flex gap-2 items-center"> <FaMailBulk></FaMailBulk>Contact</NavLink></li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="col-span-4 bg-gray-100 pl-8 py-16">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;