import {checkUserNavbar} from "@/functions";
import categories from "@/models/categories";
import connectToMongo from "@/database/connectToMongo";

export const POST = async req => {
    const userRequested = await checkUserNavbar()

    if (!userRequested) {
        return Response.json("شما اجازه دسترسی به این API را ندارید")
    }

    const {title} = await req.json()

    const createResponse = await categories.create({title})

    if (!createResponse) {
        return Response.json("دسته بندی ایجاد نشد", {status: 404})
    }

    return Response.json("دسته بندی ایجاد شد", {status: 200})
}

export const GET = async () => {
    connectToMongo()

    const categoriesResult= await categories.find()

    if (!categoriesResult) {
        return Response.json("دسته بندی یافت نشد", {status: 404})
    }

    return Response.json(categoriesResult, {status: 200})
}