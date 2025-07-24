import connectToMongo from "@/database/connectToMongo";
import articles from "@/models/articles";
import {checkUserNavbar} from "@/functions";
import fs from "fs";
import path from "node:path";
import {isValidObjectId} from "mongoose";

export const GET = async () => {
    connectToMongo()

    const articlesResult = await articles.find().populate("creator")

    if (!articles) {
        return Response.json("مقاله ای یافت نشد", {status: 404})
    }

    return Response.json(articlesResult, {status: 200})
}

export const POST = async req => {
    try {
        const contentType = req.headers.get("content-type") || ""

        if (!contentType.startsWith("multipart/form-data")) {
            return Response.json("نوع محتوا باید form-data", {status: 400})
        }

        const formData = await req.formData()
        const title = formData.get("title")
        const body = formData.get("body")
        const poster = formData.get("poster")

        if ((!poster || !poster.name || poster.size === 0) || !title || !body) {
            return Response.json("ارسال تمام فیلد ها اجباری است", {status: 410})
        }

        const userRequested = await checkUserNavbar()

        if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
            return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
        }

        const imageBuffer = await Buffer.from(await poster.arrayBuffer())
        const fileName = Date.now() + poster.name

        await fs.promises.writeFile(path.join(process.cwd(), `public/images/${fileName}`), imageBuffer)

        const createResponse = await articles.create({
            title,
            body,
            poster: `/images/${fileName}`,
            creator: userRequested._id
        })

        if (!createResponse) {
            return Response.json("مشکلی پیش آمده", {status: 500})
        }
        return Response.json("مقاله ایجاد شد", {status: 200})
    } catch (error) {
        console.log("error => ", error)
        return Response.json("مشکلی پیش آمده !!", {status: 500})
    }
}

export const PUT = async req => {
    try {
        const contentType = req.headers.get("content-type") || ""

        if (!contentType.startsWith("multipart/form-data")) {
            return Response.json("نوع محتوا باید form-data", {status: 400})
        }

        const formData = await req.formData()
        const articleId = formData.get("articleId")
        const title = formData.get("title")
        const body = formData.get("body")
        const poster = formData.get("poster")

        if (typeof poster === "string" && title && body && isValidObjectId(articleId)) {
            const userRequested = await checkUserNavbar()

            if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
                return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
            }

            const createResponse = await articles.findOneAndUpdate({_id: articleId}, {$set: {poster, body, title}})

            if (!createResponse) {
                return Response.json("مقاله ای یافت نشد", {status: 404})
            }
            return Response.json("مقاله تغییر کرد", {status: 200})
        }

        if ((!poster || !poster.name || poster.size === 0) || !title || !body || !isValidObjectId(articleId)) {
            return Response.json("ارسال تمام فیلد ها اجباری است", {status: 410})
        }

        const userRequested = await checkUserNavbar()

        if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
            return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
        }

        const imageBuffer = await Buffer.from(await poster.arrayBuffer())
        const fileName = Date.now() + poster.name

        await fs.promises.writeFile(path.join(process.cwd(), `public/images/${fileName}`), imageBuffer)

        const createResponse = await articles.findOneAndUpdate({_id: articleId}, {$set: {poster: `/images/${fileName}`, body, title}})

        if (!createResponse) {
            return Response.json("مقاله ای یافت نشد", {status: 404})
        }
        return Response.json("مقاله تغییر کرد", {status: 200})
    } catch (error) {
        console.log("error => ", error)
        return Response.json("مشکلی پیش آمده !!", {status: 500})
    }
}

export const DELETE = async req => {
    const {articleId} = await req.json()

    if (!isValidObjectId(articleId)) {
        return Response.json("آیدی نیست یا معتبر نیست", {status: 411})
    }

    const userRequested = await checkUserNavbar()

    if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
        return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
    }

    const removeResponse = await articles.findOneAndDelete({_id: articleId}, {new: true})

    if (!removeResponse) {
        return Response.json("مقاله یافت نشد", {status: 404})
    }
    return Response.json("مقاله حذف شد", {status: 200})
}