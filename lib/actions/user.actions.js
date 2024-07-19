"use server"

import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export const createUser = async (user) => {
    try {
        await connectToDatabase()

        const newUser = await User.create(user)
        if(!newUser) throw new Error('User Creation Failed')

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = async ({query, filterState, filterRole}) => {
    try {
        await connectToDatabase()

        const nameCondition = query ? 
            {
                $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } }
                ]
            } : {}
        const stateCondition = filterState ? {state: filterState} : {}
        const roleCondition = filterRole ? {role: filterRole} : {} 

        const conditions = {
            $and: [nameCondition, stateCondition, roleCondition],
        }

        const users = await User.find(conditions).sort({ createdAt: 'desc' })
        const usersCount = await User.countDocuments(conditions)
        
        return {
            data: JSON.parse(JSON.stringify(users)),
            totalDocs: usersCount,
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (id) => {
    try {
        await connectToDatabase()

        const user = await User.findById(id)
        if(!user) throw new Error('User not found')

        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.log(error);
    }
}

export const getUserCountBasedOnRole = async () => {
    try {
        await connectToDatabase()

        const usersByRole = await User.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);
        const usersCount = await User.countDocuments()

        return {
            data: JSON.parse(JSON.stringify(usersByRole)),
            totalUsers: usersCount,
        };

    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (id, user) => {
    try {
        await connectToDatabase()

        const newUser = await User.findByIdAndUpdate(id, user, {
            new: true,
        })
        if(!newUser) throw new Error('User updation failed')

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (id) => {
    try {
        await connectToDatabase()

        const user = await User.findById(id)
        if(!user) throw new Error('User not found')

        const deletedUser = await User.findByIdAndDelete(id)
        if(!deletedUser) throw new Error('User deletion failed')

        return JSON.parse(JSON.stringify(deletedUser))
    } catch (error) {
        console.log(error);
    }
}