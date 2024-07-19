"use server"

import { connectToDatabase } from "../database";
import Notification from "../database/models/notification.model";

export const createNoti = async (noti) => {
    try {
        await connectToDatabase()

        const newNoti = await Notification.create(noti)
        if(!newNoti) throw new Error("Notification creation failed")

        return JSON.parse(JSON.stringify(newNoti))
    } catch (error) {
        console.log(error);
    }
}

export const getAllNotis = async () => {
    try {
        await connectToDatabase()

        const notis = await Notification.find()
        const unreadCount = await Notification.countDocuments({ read: false });
        const totalNotis = await Notification.countDocuments();

        return {
            data: JSON.parse(JSON.stringify(notis)),
            unread: unreadCount,
            totalDocs: totalNotis
        }
    } catch (error) {
        console.log(error);
    }
}