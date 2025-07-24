import fs from "fs"

import * as path from "node:path";
import users from "@/models/users";
import {checkUserNavbar} from "@/functions";

export const POST = async req => {
    const contentType = req.headers.get("content-type") || ""

    if (!contentType.startsWith("multipart/form-data")) {
        return Response.json("نوع محتوا باید form-data", {status: 400})
    }


    const formData = await req.formData()
    const image = formData.get("image")
    if ((!image || !image.name || image.size === 0)) {
        return Response.json("ارسال عکس الزامی است", {status: 411})
    }

    try {
        const user = await checkUserNavbar()

        if (!user) {
            return Response.json("کاربر احراز هویت نکرده!!", {status: 411})
        }

        if (user.limitProfile < Date.now()) {
            const imageBuffer = await Buffer.from(await image.arrayBuffer())
            const fileName = Date.now() + image.name

            await fs.promises.writeFile(path.join(process.cwd(), `public/images/${fileName}`), imageBuffer)

            const oneMonthLater = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 روز به میلی‌ثانیه

            await users.findOneAndUpdate(
                { phone: user.phone },
                {
                    $set: {
                        profile: `/images/${fileName}`,
                        limitProfile: oneMonthLater,
                    },
                },
                { new: true }
            );
            return Response.json("File uploaded successfully", {status: 201})
        }
        return Response.json("شما فقط هر ماه یک بار میتوانید پروفایل خود را عوض کنید", {status: 429})
    } catch (error) {
        console.log("err from upload file ==> ", error)
        return Response.json("Internal error for upload file", {status: 511})
    }
}