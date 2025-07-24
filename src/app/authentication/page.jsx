"use client"

import Signup from "@/components/Signup/Signup";
import LoginEmail from "@/components/LoginEmail/LoginEmail";
import LoginPhone from "@/components/LoginPhone/LoginPhone";
import {useEffect, useState} from "react";
import Recovery from "@/components/Recovery/Recovery";

export default () => {
    const [formType, setFormType] = useState("")

    useEffect(() => {
       if (formType) {
           localStorage.setItem("form", formType)
       }
    }, [formType])

    useEffect(() => {
        const form = localStorage.getItem("form")

        if (form) {
            console.log("form => ", form)
            setFormType(form)
        } else {
            console.log("form => ", form)
            localStorage.setItem("form", "login-email")
            setFormType("login-email")
        }
    }, [])

    const switchLogin = (type) => {
        switch (type) {
            case "signup" : {
                return <Signup switchForms={setFormType}/>
            }
            case "login-email" : {
                return <LoginEmail switchForms={setFormType}/>
            }
            case "login-phone" : {
                return <LoginPhone switchForms={setFormType}/>
            }
            case "recovery" : {
                return <Recovery switchForms={setFormType}/>
            }
        }
    }

    return (
        <>
            {
                formType ? switchLogin(formType) : null
            }
        </>
    )
}