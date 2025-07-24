import connectToMongo from "@/database/connectToMongo";
import otp from "@/models/otp";
import users from "@/models/users";
import {getToken} from "@/functions";
import {serialize} from "cookie";

export const POST = async req => {
    try {
        const {phone, code} = await req.json()

        if (!phone || !code) {
            return Response.json("پارامتر ها الزامی هستند", {status: 411})
        }

        connectToMongo()

        const userResult = await users.findOne({phone})

        if (!userResult) {
            return Response.json("کاربری با این تلفن ثبت نام نکرده", {status: 404})
        }

        const checkVerify = await otp.findOne({phone, code})

        if (!checkVerify) {
            return Response.json("کد نامعتبر است", {status: 412})
        }

        if (checkVerify.expireTime < Date.now()) {
            return Response.json("کد منقضی شده", {status: 412})
        }

        const token = getToken(userResult.email)
        return Response.json("شما با موفقیت وارد شدید", {
            status: 200,
            headers: {"Set-Cookie": serialize("token", token, {path: "/", httpOnly: true, maxAge: 60 * 60 * 24 * 3})}
        })
    } catch (error) {
        console.log("err from check code => ", error)
        return Response.json("مشکلی پیش آمده", {status: 411})
    }
}