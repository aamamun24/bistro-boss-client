import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { _id, name, recipe, image, price } = item;
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()

    const handleAddToCart = () => {
        if (user && user.email) {
            // send cart to the database
            const menuItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', menuItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: `${name} added on cart`,
                            showClass: {
                                popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                              `
                            },
                            hideClass: {
                                popup: `
                                animate__animated
                                animate__fadeOutDown
                                animate__faster
                              `
                            }
                        });
                    }
                    // refetch cart to update the cart items count
                    refetch()
                })

        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Are you want to login?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="bg-gray-100 rounded-md ">
            <div className="relative">
                <img className="w-full rounded-t-md" src={image} alt="" />
                <p className="bg-gray-900 rounded-md p-2 text-white absolute right-3 top-3">${price}</p>
            </div>
            <div className="p-8 flex flex-col">
                <h2 className="text-2xl font-semibold text-center">{name}</h2>
                <p className="text-gray-500 my-2 flex-grow">{recipe}</p>
                <div className="flex justify-center">
                    <button onClick={handleAddToCart} className="btn btn-outline bg-slate-200 border-0 border-b-2 text-orange-400">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;