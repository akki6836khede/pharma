"use server"

import React from 'react'
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import Image from 'next/image';
import UserPage from './frontuser';

const page = async ({params}) => {
    await connectToDB();
    const emaile = params.slug
    const email = decodeURIComponent(emaile)
    const user = await User.findOne({email})
    return (
        <UserPage name={user.name} email={user.email} image={user.image}></UserPage>
    )
}

export default page
