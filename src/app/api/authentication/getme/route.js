import {cookies} from "next/headers";
import {decodeToken} from "@/functions";
import connectToMongo from "@/database/connectToMongo";
import users from "@/models/users";

export const GET = async () => {
    const resultCookies= await cookies()
    const token = resultCookies.get("token")?.value

    if (!token) {
        return Response.json("کاربر لاگین نکرده", {status: 411})
    }

    const email = decodeToken(token)?.email

    if (!email) {
        return Response.json("کاربر لاگین نکرده", {status: 411})
    }

    connectToMongo()

    const resultUser = await users.findOne({email})

    console.log("user => (from server)", resultUser)

    if (!resultUser) {
        return Response.json("کاربر لاگین نکرده", {status: 411})
    }

    return Response.json(resultUser, {status: 200})
}