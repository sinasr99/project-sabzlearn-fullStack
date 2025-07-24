import {checkUserNavbar} from "@/functions";
import users from "@/models/users";

export const PUT = async req => {
    const {phone} = await req.json()

    if (!phone) {
        return Response.json("فیلد phone برای شناسایی کاربر الزامی است", {status: 411})
    }

    const userRequested = await checkUserNavbar()

    if (userRequested?.role !== 'Admin') {
        return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
    }

    const userBlockResponse = await users.findOneAndUpdate({phone},{$set: {isBlock: true}}, {new: true})

    if (!userBlockResponse) {
        return Response.json("کاربری با این شماره یافت نشد", {status: 404})
    }

    return Response.json("کاربر بلاک شد", {status: 200})
}