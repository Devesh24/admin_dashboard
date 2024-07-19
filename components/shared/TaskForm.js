"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect } from "react";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import { createTask, updateTask } from "@/lib/actions/task.actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    title: z.string().min(3, 'Title must be atleast 3 characters.').max(50, 'Title must be atmost 50 characters.'),
    priority: z.string().min(1, 'This field is required.'),
    dueDate: z.date(),
    completedAt: z.date().optional(),
    description: z.string().min(3, 'Description must be atleast 3 characters.').max(400, 'Description must be atmost 400 characters.'),
    status: z.string().min(1, 'This field is required.'),
});

const taskDefaultValues = {
    title: "",
    priority: "",
    dueDate: "",
    completedAt: undefined,
    description: "",
    status: "",
};

const TaskForm = ({type, task}) => {
    let form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: taskDefaultValues,
    })
    
    useEffect(() => {
        if(task && type === "Update"){
            const formattedTask = {
                ...task,
                dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
                completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
            };
            form.reset(formattedTask)
        }
    },[task])
    
    const router = useRouter()

    async function onSubmit(values) {
        if(type === "Create"){
            try {
                const newTask = await createTask(values)
                
                if(newTask) {
                    form.reset()
                    router.push(`/tasks/${newTask._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
        else{
            try {
                const updatedTask = await updateTask(task._id, values)
                
                if(updatedTask) {
                    form.reset(updatedTask)
                    router.push(`/tasks/${updatedTask._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

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
    <div className='w-[70%] py-10'>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 text-black"
            >
                <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input
                            placeholder="Title"
                            {...field}
                            className="input-field"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Dropdown
                            onChangeHandler={field.onChange}
                            value={field.value}
                            placeholder={"Priority Type"}
                            dropdownItems={priorities}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-between h-[55px] w-full overflow-hidden rounded-xl bg-gray-50 px-4 py-2 border-2 border-red-500">
                                <p className="ml-3 whitespace-nowrap text-grey-600">Due Date:</p>
                                <DatePicker selected={field.value || null} onChange={(date) => field.onChange(date)} dateFormat={"dd/MM/yyyy"} wrapperClassName="datePicker" />
                                <Image src={"/assets/icons/calendar.svg"} alt="calender" width={24} height={24} className="filter-grey" />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="completedAt"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-between h-[55px] w-full overflow-hidden rounded-xl bg-gray-50 px-4 py-2 border-2 border-red-500">
                                <p className="ml-3 whitespace-nowrap text-grey-600">Completion Date:</p>
                                <DatePicker selected={field.value || null} onChange={(date) => field.onChange(date)} dateFormat={"dd/MM/yyyy"} wrapperClassName="datePicker" />
                                <Image src={"/assets/icons/calendar.svg"} alt="calender" width={24} height={24} className="filter-grey" />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl className="h-72">
                            <Textarea placeholder="Description" {...field} className="textarea rounded-xl"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Dropdown
                            onChangeHandler={field.onChange}
                            value={field.value}
                            placeholder={"Status"}
                            dropdownItems={statuses}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <button type="submit"
                className="py-3 ps-7 pe-3 border-2 border-red-500 flex-center w-fit rounded-full text-lg mt-2 gap-4 hover:bg-red-500 hover:text-white transition-colors duration-500 bg-transparent"
                disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? 'Submitting...' : `${type} task`}
                <span className="py-3 px-4 rounded-full bg-red-600">
                    <Image
                    src={"/assets/icons/right-arrow.svg"}
                    width={15}
                    height={15}
                    alt="rightArrow"
                    />
                </span>
                </button>
            </form>
        </Form>
    </div>
  )
}

export default TaskForm