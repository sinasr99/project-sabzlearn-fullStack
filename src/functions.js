import {verify, sign} from "jsonwebtoken";
import {hash} from "bcryptjs";
import {redirect} from "next/navigation";
import users from "@/models/users";
import connectToMongo from "@/database/connectToMongo";
import {cookies} from "next/headers";

export function decodeToken(token) {
    return verify(token, "a-string-secret-at-least-256-bits-long")
}

export async function getHash(password) {
    return await hash(password, 12)
}

export function getToken(email) {
    return sign({email}, "a-string-secret-at-least-256-bits-long")
}

// check user ======================= =====================
export const checkUser = async(role) => {
    const cookiesResult = await cookies()
    const token = cookiesResult.get("token")?.value

    if (!token) {
        redirect("/")
    }

    const email = decodeToken(token)?.email

    if (!email) {
        redirect("/")
    }

    connectToMongo()

    const result = await users.findOne({email})

    if (!result) {
        return redirect("/")
    }

    if (result.role !== role) {
        return redirect("/")
    }

    return JSON.parse(JSON.stringify(result))
}

export const checkUserNavbar = async () => {
    const cookiesResult = await cookies()
    const token = cookiesResult.get("token")?.value

    if (!token) {
        return null
    }

    const email = decodeToken(token)?.email

    if (!email) {
        return null
    }

    connectToMongo()

    const result = await users.findOne({email})

    if (!result) {
        return null
    }

    return JSON.parse(JSON.stringify(result))
}