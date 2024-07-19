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
import FileUploader from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import { createUser, updateUser } from "@/lib/actions/user.actions";

const formSchema = z.object({
    username: z.string().min(3, 'Name must be atleast 3 characters.').max(20, 'Name must be atmost 20 characters.'),
    email: z.string().min(1, 'This field is mandatory.').email('Enter valid Email.'),
    firstName: z.string().min(3, 'Name must be atleast 3 characters.').max(15, 'Name must be atmost 15 characters.'),
    lastName: z.string().min(3, 'Name must be atleast 3 characters.').max(20, 'Name must be atmost 20 characters.'),
    city: z.string().min(1, 'This field is required.'),
    state: z.string().min(1, 'This field is required.'),
    role: z.string().min(1, 'This field is required.'),
    imageUrl: z.string().min(1, 'This field is required.'),
});

const userDefaultValues = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    role: "",
    imageUrl: "",
};

const UserForm = ({type, user}) => {

    const [files, setFiles] = useState([])
    
    let form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: userDefaultValues,
    })

    useEffect(() => {
        user && type === "Update" && form.reset(user)
    },[user])
    
    const {startUpload} = useUploadThing('imageUploader')
    const router = useRouter()

    async function onSubmit(values) {
        
        let uploadedImageUrl = values.imageUrl
        if(files.length > 0) {
            const uploadedImages = await startUpload(files)

            if(!uploadedImages) return

            uploadedImageUrl = uploadedImages[0].url
        }
        
        if(type === "Create"){
            try {
                const newUser = await createUser({...values, imageUrl: uploadedImageUrl})
                
                if(newUser) {
                    form.reset()
                    router.push(`/users/${newUser._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
        else{
            try {
                const updatedUser = await updateUser(user._id, {...values, imageUrl: uploadedImageUrl})
                
                if(updatedUser) {
                    form.reset(updatedUser)
                    router.push(`/users/${updatedUser._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const roles = [
        {id:1, label: "Role 1"},
        {id:2, label: "Role 2"},
        {id:3, label: "Role 3"},
        {id:4, label: "Role 4"}
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
                    name="username"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input
                            placeholder="Username"
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
                    name="email"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input
                            type="email"
                            placeholder="Email"
                            {...field}
                            className="input-field"
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
                    name="firstName"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input
                            placeholder="First Name"
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
                    name="lastName"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input
                            placeholder="Last Name"
                            {...field}
                            className="input-field"
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
                    name="city"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input
                            placeholder="City"
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
                    name="state"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input
                            placeholder="State"
                            {...field}
                            className="input-field"
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
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl className="h-72">
                                <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormControl>
                            <Dropdown
                            onChangeHandler={field.onChange}
                            value={field.value}
                            placeholder={"Role"}
                            dropdownItems={roles}
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
                    {form.formState.isSubmitting ? 'Submitting...' : `${type} user`}
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

export default UserForm