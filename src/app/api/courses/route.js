import {checkUserNavbar} from "@/functions";
import courses from "@/models/courses";
import fs from "fs";
import path from "node:path";
import connectToMongo from "@/database/connectToMongo";
import season from "@/models/seasons";
import episodes from "@/models/episodes";
import {isValidObjectId} from "mongoose";

export const POST = async req => {
    try {
        const contentType = req.headers.get("content-type") || ""

        if (!contentType.startsWith("multipart/form-data")) {
            return Response.json("نوع محتوا باید form-data", {status: 400})
        }

        const formData = await req.formData()
        const title = formData.get("title")
        const price = formData.get("price")
        const category = formData.get("category")
        const shortCaption = formData.get("shortCaption")
        const description = formData.get("description")
        const duration = formData.get("duration")
        const introductionVideo = formData.get("introductionVideo")
        const introductionPoster = formData.get("introductionPoster")
        const canDownload = formData.get("canDownload")
        const isReady = formData.get("isReady")

        if ((!introductionVideo || !introductionVideo.name || introductionVideo.size === 0) ||
            (!introductionPoster || !introductionPoster.name || introductionPoster.size === 0) ||
            !title || !shortCaption || !description || !duration ||!price || !canDownload || !isValidObjectId(category)) {
            return Response.json("ارسال تمام فیلد ها اجباری است", {status: 410})
        }

        const userRequested = await checkUserNavbar()

        if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
            return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
        }

        const imageBuffer = await Buffer.from(await introductionPoster.arrayBuffer())
        const fileName = Date.now() + introductionPoster.name

        await fs.promises.writeFile(path.join(process.cwd(), `public/courses/images/${fileName}`), imageBuffer)

        const videoBuffer = await Buffer.from(await introductionVideo.arrayBuffer())
        const videoName = Date.now() + introductionVideo.name

        await fs.promises.writeFile(path.join(process.cwd(), `public/courses/videos/${videoName}`), videoBuffer)

        const createResponse = await courses.create({
            isComplete: isReady,
            title,
            price,
            category,
            shortCaption,
            description,
            canDownload,
            creator: userRequested._id,
            duration,
            introductionVideo: `/courses/videos/${videoName}`,
            introductionPoster: `/courses/images/${fileName}`
        })

        if (!createResponse) {
            return Response.json("دوره ایجاد نشد", {status: 500})
        }

        return Response.json("دوره ایجاد شد", {status: 200})
    } catch (error) {
        console.log("error => ", error)
        return Response.json("مشکلی پیش آمده !!", {status: 500})
    }
}

export const GET = async () => {
    connectToMongo()

    const courseResult = await courses.find()
        .populate({
            path: "parts",
            model: "Seasons",
            populate: {
                path: "episodes",
                model: "Episodes"
            }
        })
        .populate({
            path: "creator",
            model: "Users"
        }).populate({
            path: "category",
            model: "Categories"
        })

    if (!courseResult) {
        return Response.json("دوره ای یافت نشد", {status: 404});
    }

    return Response.json(courseResult, {status: 200});
}