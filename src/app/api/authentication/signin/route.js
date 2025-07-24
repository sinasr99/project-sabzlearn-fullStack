import connectToMongo from "@/database/connectToMongo";
import users from "@/models/users";
import {compare} from "bcryptjs";
import {getToken} from "@/functions";
import {serialize} from "cookie";

export const POST = async req => {
    try {
        const {email, password} = await req.json()

        if (!email || !password) {
            return Response.json("پارامتر ها الزامی هستند", {status: 411})
        }

        connectToMongo()

        const userResult = await users.findOne({email})

        if (!userResult) {
            return Response.json("ایمیل با رمز اشتباه است", {status: 412})
        }

        const checkPassword = await compare(password, (userResult).password)

        if (!checkPassword) {
            return Response.json("ایمیل با رمز اشتباه است", {status: 412})
        }

        const token = getToken(userResult.email)

        return Response.json("شما با موفقیت وارد شدید", {
            status: 201,
            headers: {
                "Set-Cookie": serialize("token", token, {httpOnly: true, maxAge: 60 * 60 * 24 * 3, path: "/"})
            }
        })
    } catch (error) {
        console.log("error from sign in => ", error)
        return Response.json("مشکلی پیش آمده", {status: 511})
    }
}