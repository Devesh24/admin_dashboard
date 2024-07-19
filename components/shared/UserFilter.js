import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "../ui/input"

const UserFilter = ({setFilterState, setFilterRole}) => {
    const roles = [
        {id:1, label: "Role 1"},
        {id:2, label: "Role 2"},
        {id:3, label: "Role 3"},
        {id:4, label: "Role 4"}
    ]

  return (
    <div className="flex flex-col gap-3 md:flex-row w-full mt-3 mb-5">
        <Select onValueChange={(value) => value==="All" ? setFilterRole(""):setFilterRole(value)} className="w-[50%]">
            <SelectTrigger className="p-regular-16 border-0 bg-gray-100 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-between min-h-[54px] w-full overflow-hidden rounded-full px-10 py-2">
                <SelectValue placeholder="Role Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
                {roles.map((role) => (
                <SelectItem value={role.label} key={role.id} className="select-item p-regular-14">
                    {role.label}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2">
            <Input 
                type="text"
                placeholder="State Filter"
                onChange={(e) => setFilterState(e.target.value)}
                className="p-regular-16 border-0 bg-gray-100 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>
    </div>
  )
}

export default UserFilter