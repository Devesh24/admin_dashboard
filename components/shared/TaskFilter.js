import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const TaskFilter = ({setFilterStatus, setFilterPriority}) => {

    const statuses = [
        {id: 1, label: 'Pending'},
        {id: 2, label: 'In Progress'},
        {id: 3, label: 'Completed'},
    ]

    const priorities = [
        {id: 1, label: 'Low'},
        {id: 2, label: 'Medium'},
        {id: 3, label: 'High'},
    ]

  return (
    <div className="flex flex-col gap-3 md:flex-row w-full mt-3 mb-5">
        <Select onValueChange={(value) => value==="All" ? setFilterStatus(""):setFilterStatus(value)} className="w-[50%]">
            <SelectTrigger className="p-regular-16 border-0 bg-gray-100 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-between min-h-[54px] w-full overflow-hidden rounded-full px-10 py-2">
                <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
                {statuses.map((status) => (
                <SelectItem value={status.label} key={status.id} className="select-item p-regular-14">
                    {status.label}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => value==="All" ? setFilterPriority(""):setFilterPriority(value)} className="w-[50%]">
            <SelectTrigger className="p-regular-16 border-0 bg-gray-100 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-between min-h-[54px] w-full overflow-hidden rounded-full px-10 py-2">
                <SelectValue placeholder="Priority Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
                {priorities.map((priority) => (
                <SelectItem value={priority.label} key={priority.id} className="select-item p-regular-14">
                    {priority.label}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default TaskFilter