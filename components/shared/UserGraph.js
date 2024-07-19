import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const UserGraph = ({userDataBasedOnRole}) => {
  return (
    <BarChart
        width={400}
        height={350}
        data={userDataBasedOnRole}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  )
}

export default UserGraph
