import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaHotel, FaTruck, FaUsers, FaWallet } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom function for the pieChart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })

    return (
        <div className="mr-6">
            <h2 className="text-2xl">
                Hi, Welcome
                <span> {user?.displayName ? user.displayName : 'Back'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
                <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] py-8 px-14 rounded-md flex gap-6 items-center justify-center text-white">
                    <h2 className="text-5xl"><FaWallet></FaWallet></h2>
                    <div>
                        <h2 className="text-4xl font-bold">{stats?.revenue}</h2>
                        <h3 className="text-2xl">Revenue</h3>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] py-8 px-14 rounded-md flex gap-6 items-center justify-center text-white">
                    <h2 className="text-5xl"><FaUsers></FaUsers></h2>
                    <div>
                        <h2 className="text-4xl font-bold">{stats?.users}</h2>
                        <h3 className="text-2xl">Customers</h3>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE9] py-8 px-14 rounded-md flex gap-6 items-center justify-center text-white">
                    <h2 className="text-5xl"><FaHotel></FaHotel></h2>
                    <div>
                        <h2 className="text-4xl font-bold">{stats?.menuItems}</h2>
                        <h3 className="text-2xl">Products</h3>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] py-8 px-14 rounded-md flex gap-6 items-center justify-center text-white">
                    <h2 className="text-5xl"><FaTruck></FaTruck></h2>
                    <div>
                        <h2 className="text-4xl font-bold">{stats?.orders}</h2>
                        <h3 className="text-2xl">Orders</h3>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 mt-10">
                {/* barChart */}
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* pieChart */}
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;