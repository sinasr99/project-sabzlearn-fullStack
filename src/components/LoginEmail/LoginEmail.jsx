"use client"

import styles from "./LoginEmail.module.css"
import {MdEmail} from "react-icons/md";
import {RiLock2Fill} from "react-icons/ri";
import {useState} from "react";
import {loginValidation} from "@/validation";
import {toast} from "react-toastify"
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";

export default ({switchForms}) => {
    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const [emailErrors, setEmailErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])

    const login = async () => {
        setIsLoading(true)
        try {
            await loginValidation.validate(
                {email, password}, {abortEarly: false}
            )

            setEmailErrors([])
            setPasswordErrors([])

            const res = await fetch(`/api/authentication/signin`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            })
            const dataResponse = await res.json()

            setIsLoading(false)

            if (res.status === 201) {
                toast.success(dataResponse)
                router.push("/")
                return true
            }
            toast.error(dataResponse)
        } catch (error) {
            setIsLoading(false)

            const emailErr = []
            const passwordErr = []

            error.inner.forEach(err => {
                switch (err.path) {
                    case "email": {
                        emailErr.push(err.message)
                        break
                    }
                    case "password": {
                        passwordErr.push(err.message)
                        break
                    }
                }
            })

            setEmailErrors(emailErr)
            setPasswordErrors(passwordErr)
        }
    }

    return (
        <div className={styles['page']}>
            <div className={styles['box']}>
                <h3 className={styles['title']}>ورود با ایمیل</h3>
                <p className={styles['caption']}>
                    هنوز ثبت نام نکرده اید؟
                    <button
                        onClick={() => switchForms("signup")}
                        className={styles['login-link']}>عضو شوید
                    </button>
                </p>
                <div className={styles['inputs']}>
                    <div className={styles['input-wrapper']}>
                        <input  value={email} onChange={e => setEmail(e.target.value)} className={styles['input']} type="text" placeholder="آدرس ایمیل"/>
                        <MdEmail className={styles['input-icon']}/>
                    </div>
                    {
                        emailErrors.map((err, i) => (
                            <p key={i} className={styles['err']}>{err}</p>
                        ))
                    }
                    <div className={styles['input-wrapper']}>
                        <input value={password} onChange={e => setPassword(e.target.value)} className={styles['input']} type="password" placeholder="رمز عبور"/>
                        <RiLock2Fill className={styles['input-icon']}/>
                    </div>
                    {
                        passwordErrors.map((err, i) => (
                            <p key={i} className={styles['err']}>{err}</p>
                        ))
                    }
                </div>
                {
                    isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                        : <button onClick={login} className={styles['register']}>ورود</button>
                }
                <div className={styles['buttons']}>
                    <button
                        onClick={() => switchForms("login-phone")}
                        className={styles['link-email-login']}>
                        ورود با موبایل
                    </button>
                    <button
                        onClick={() => switchForms("recovery")}
                        className={styles['link-email-login']}>
                        فراموشی رمز
                    </button>
                </div>
            </div>
        </div>
    )
}