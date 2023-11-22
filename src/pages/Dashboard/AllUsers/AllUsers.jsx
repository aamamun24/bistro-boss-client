import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUsersCog } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Admin!",
                                text: `${user.name} is admin now.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleDeleteUser = id => {
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
                axiosSecure.delete(`/users/${id}`)
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
            <SectionTitle heading="Mange all users" subHeading="How many??"></SectionTitle>
            <div className="bg-white p-10 m-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">All Users: {users.length}</h2>
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ?
                                                'Admin'
                                                :
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn bg-orange-400">
                                                    <FaUsersCog className="text-xl text-white"></FaUsersCog>
                                                </button>
                                        }
                                    </td>
                                    <th>
                                        <button onClick={() => handleDeleteUser(user._id)} className="text-xl text-red-600"><FaTrash></FaTrash></button>
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

export default AllUsers;