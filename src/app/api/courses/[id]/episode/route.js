import {checkUserNavbar} from "@/functions";
import fs from "fs";
import path from "node:path";
import courses from "@/models/courses";
import episodes from "@/models/episodes";
import seasons from "@/models/seasons";
import {isValidObjectId} from "mongoose";

export const POST = async (req, {params}) => {
    try {
        const contentType = req.headers.get("content-type") || ""

        if (!contentType.startsWith("multipart/form-data")) {
            return Response.json("نوع محتوا باید form-data", {status: 400})
        }

        const formData = await req.formData()
        const number = formData.get("number")
        const title = formData.get("title")
        const creator = formData.get("creator")
        const video = formData.get("video")
        const seasonId = formData.get("seasonId")
        const file = formData.get("file")

        if (!title || !video ||!isValidObjectId(seasonId) ||!isValidObjectId(creator)) {
            return Response.json("ارسال فیلد های موضوع و ویدئو و فصل اجباری است", {status: 410})
        }

        const userRequested = await checkUserNavbar()

        if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
            return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
        }

        const {id: courseId} = params

        const isThereCourse = await courses.find({_id: courseId})

        if (!isThereCourse) {
            return Response.json("همچین دوره ای وجود ندارید")
        }

        let fileName = null

        if (file && file.name && file.size > 0) {
            const fileBuffer = await Buffer.from(await video.arrayBuffer())
            fileName = Date.now() + video.name

            await fs.promises.writeFile(path.join(process.cwd(), `public/courses/files/${fileName}`), fileBuffer)
        }

        const videoBuffer = await Buffer.from(await video.arrayBuffer())
        const videoName = Date.now() + video.name

        await fs.promises.writeFile(path.join(process.cwd(), `public/courses/videos/${videoName}`), videoBuffer)

        const createResponse = await episodes.create({
            creator,
            title,
            number: number || 0,
            video: `/courses/videos/${videoName}`,
            file: (file && file.name && file.size > 0) ? `/courses/files/${fileName}` : null,
        })

        if (!createResponse) {
            return Response.json("قسمت ایجاد نشد", {status: 500})
        }

        const updateSeason = await seasons.findOneAndUpdate({_id: seasonId}, {
            $push: {episodes: createResponse._id},
        }, {new: true})

        if (!updateSeason) {
            return Response.json("فصل آپدیت نشد", {status: 404})
        }
        return Response.json("فصل آپدیت شد", {status: 200})
    } catch (error) {
        console.log("error => ", error)
        return Response.json("مشکلی پیش آمده !!", {status: 500})
    }
}