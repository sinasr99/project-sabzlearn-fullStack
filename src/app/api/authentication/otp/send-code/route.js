import connectToMongo from "@/database/connectToMongo";
import users from "@/models/users";
import otp from "@/models/otp";

export const POST = async req => {
    try {
        const {phone} = await req.json()

        if (!phone) {
            return Response.json("پارامتر تلفن الزامی است", {status: 411})
        }

        connectToMongo()

        const userResult = await users.findOne({phone})

        if (!userResult) {
            return Response.json("کاربری با این شماره تلفن یافت نشد", {status: 404})
        }

        const code = Math.floor(1000 + Math.random() * 9000)

        const sendCodeResponse = await fetch("http://ippanel.com/api/select", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                op: "pattern",
                user: "u09056408450",
                pass: "Ss1383@#$",
                fromNum: "3000505",
                toNum: phone,
                patternCode: "st11yanj7qh72la",
                inputData: [{code}],
            }),
        })

        if (!sendCodeResponse.ok) {
            return Response.json("مشکلی پیش آمده", {status: 500})
        }

        const expireTime = new Date(new Date().getTime() + 2 * 60 * 1000).getTime()

        await otp.create({phone, code, expireTime})

        return Response.json("کد بر روی تلفن شما ارسال شد", {status: 201})
    } catch (error) {
        console.log("error from send code => ", error)
        return Response.json("مشکلی پیش آمده", {status: 500})
    }

}