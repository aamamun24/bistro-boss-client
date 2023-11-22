import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    return (
        <div className="mb-10">
            <SectionTitle heading="Wanna add more?" subHeading="My Cart"></SectionTitle>
            <div className="bg-white p-10 m-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Items: {cart.length}</h2>
                    <h2 className="text-2xl font-bold">Total Price: {totalPrice}</h2>
                    {
                        cart.length ?
                            <Link to="/dashboard/payment">
                                <button className="btn btn-sm btn-primary">Pay</button>
                            </Link>
                            :
                            <button className="btn btn-sm btn-primary" disabled>Pay</button>
                    }
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.image} alt={item?.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h4>{item?.name}</h4>
                                    </td>
                                    <td>{item?.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="text-xl text-red-600"><FaTrash></FaTrash></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;