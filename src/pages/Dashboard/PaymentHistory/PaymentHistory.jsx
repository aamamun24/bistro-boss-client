import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <SectionTitle heading="Payment History" subHeading="At a Glance!"></SectionTitle>
            <div className='my-10 mx-16 p-10 bg-white'>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Payments: {payments.length}</h2>
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="table">
                        <thead className='bg-orange-400 text-white uppercase font-semibold'>
                            <tr>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Total Price</th>
                                <th>Payment Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((item) => <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item?.transactionId}</td>
                                    <td>${item?.price}</td>
                                    <td>{item?.date}</td>
                                    <td>{item?.status}</td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;