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
import Image from "next/image";
import React from "react";
import { createNoti } from "@/lib/actions/notification.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    title: z.string().min(3, 'Title must be atleast 3 characters.').max(50, 'Title must be atmost 50 characters.'),
    senderName: z.string().min(3, 'senderName must be atleast 3 characters.').max(50, 'senderName must be atmost 50 characters.'),
    description: z.string().min(3, 'Description must be atleast 3 characters.').max(400, 'Description must be atmost 400 characters.'),
});

const notiDefaultValues = {
    title: "",
    senderName: "",
    description: "",
};

const CreateNotifications = () => {
    let form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: notiDefaultValues,
    })

    async function onSubmit(values) {
        try {
            const newNoti = await createNoti(values)
            
            if(newNoti) {
                form.reset()
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #2e1065, rgba(0,0,0,1))",
      }}
      className="w-full min-h-screen flex-between"
    >
      <div className="wrapper lg:flex-between flex-center gap-10 lg:gap-0 flex-wrap mt-32">
        <div className="lg:w-[40%] md:w-[60%] w-[80%] aspect-square rounded-full p-10 flex-center bg-[#0b06186b] shadow-[inset_0_0_40px_rgba(139,92,246,0.4)]">
          <div className="border-2 border-[#49318266] w-[90%] aspect-square rounded-full p-10 flex-center bg-[#190E3466]">
            <div className="border border-violet-800 w-[90%] aspect-square rounded-full p-10 flex-center bg-[#190E3466]">
              <div className="rounded-full p-3 bg-violet-950 flex-center aspect-square">
                <Image
                  src={"/assets/images/vector.png"}
                  alt="bell"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] lg:w-fit">
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
                        name="senderName"
                        render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    placeholder="Sender Name"
                                    {...field}
                                    className="input-field"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
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
                    <button type="submit"
                    className="py-3 ps-7 pe-3 border-2 text-white border-red-500 flex-center w-fit rounded-full text-lg mt-2 gap-4 hover:bg-red-500 transition-colors duration-500 bg-transparent"
                    disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Submitting...' : `Send Notification`}
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
      </div>
    </div>
  );
};

export default CreateNotifications;
