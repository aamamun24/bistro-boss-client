import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, , refetch] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch the ui
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <div className=''>
            <SectionTitle heading="manage all items" subHeading="hurry up"></SectionTitle>
            <div className='my-10 mx-16 p-10 bg-white'>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Items: {menu.length}</h2>
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="table">
                        <thead className='bg-orange-400 text-white uppercase font-semibold'>
                            <tr>
                                <th></th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td><img src={item?.image} className='w-20 h-20 object-cover' alt="" /></td>
                                    <td>{item?.name}</td>
                                    <td>${item?.price}</td>
                                    <th>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="text-xl text-white bg-orange-400 p-3 rounded"><FaEdit></FaEdit></button>
                                        </Link>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteItem(item._id)} className="text-xl text-white bg-red-600 p-3 rounded"><FaTrashAlt></FaTrashAlt></button>
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

export default ManageItems;