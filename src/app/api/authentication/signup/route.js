import users from "@/models/users";
import connectToMongo from "@/database/connectToMongo";
import {getToken, getHash} from "@/functions";
import {serialize} from "cookie";

export const POST = async req => {

    try {
        const {username, phone, email, password} = await req.json()

        if (!username || !phone || !email || !password) {
            return Response.json("پارامتر ها کامل نیست", {status: 411})
        }

        connectToMongo()

        const usersResult = await users.find()

        let role = "User"
        const token = getToken(email)
        const hashedPassword = await getHash(password)

        if (!usersResult.length) {
            role = "Admin"
            return await createUser(Response, username, phone, hashedPassword, email, role, token)
        }

        const checkUserExist = usersResult.some(user => {
            if (user.email === email || user.phone === phone) {
                return true
            }
        })

        if (checkUserExist) {
            return Response.json("کاربری با این ایمیل یا تلفن قبلا عضو شده", {
                status: 412,
            })
        }

        return await createUser(Response, username, phone, hashedPassword, email, role, token)
    } catch (error) {
        console.log('error => ', error)
        return Response.json("مشکلی پیش آمده", {status: 511})
    }
}

async function createUser(response, username, phone, password, email, role, token) {
    const createUserResponse = await users.create({username, phone, email, password, role})

    if (!createUserResponse) {
        return response.json("مشکلی در ارتباط با دیتابیس پبیش آمد", {
            status: 511
        })
    }

    return response.json("شما با موفقیت عضو شدید", {
        status: 201,
        headers: {
            "Set-Cookie": serialize("token", token, {httpOnly: true, maxAge: 60 * 60 * 24 * 3, path: "/"})
        }
    })
}