import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  

const Dropdown = ({onChangeHandler, value, placeholder, dropdownItems}) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {
                dropdownItems.length>0 && dropdownItems.map((item) => (
                    <SelectItem key={item.id} value={item.label} className="select-item p-regular-14">{item.label}</SelectItem>
                ))
            }
        </SelectContent>
    </Select>
  )
}

export default Dropdown