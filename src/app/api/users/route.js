import {checkUserNavbar} from "@/functions";
import users from "@/models/users";

export const GET = async req => {
    const userRequested = await checkUserNavbar()

    if (userRequested?.role !== 'Admin') {
        return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
    }

    const getUsersResponse = await users.find()

    if (!getUsersResponse) {
        return Response.json("کاربری یافت نشد", {status: 404})
    }

    return Response.json(getUsersResponse, {status: 200})
}