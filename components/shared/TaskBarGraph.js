import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TaskBarGraph = ({taskDataBasedOnStatus}) => {
  return (
    <BarChart
        width={400}
        height={350}
        data={taskDataBasedOnStatus}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="High" fill="#ef4444" />
        <Bar dataKey="Medium" fill="#f97316" />
        <Bar dataKey="Low" fill="#22c55e" />
    </BarChart>
  )
}

export default TaskBarGraph
