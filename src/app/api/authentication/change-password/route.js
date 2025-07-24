import connectToMongo from "@/database/connectToMongo";
import users from "@/models/users";
import {getHash} from "@/functions";

export const PUT = async req => {
    const {phone, password} = await req.json()

    connectToMongo()
    const hashedPassword = await getHash(password)

    const confirmUpdate = await users.findOneAndUpdate({ phone },{ $set: { password: hashedPassword } },{ new: true }
    )

    if (!confirmUpdate) {
        return Response.json("مشکلی پیش آمده", {status: 500})
    }

    return Response.json("رمز عبور شما آپدیت شد", {status: 200})
}