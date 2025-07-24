"use client"

import styles from "./Signup.module.css"
import {FaPhoneAlt, FaUser} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {RiLock2Fill} from "react-icons/ri";
import {registerValidation} from "@/validation";
import {useState} from "react";
import {toast} from "react-toastify";
import {CircularProgress} from "@mui/material";
import {useRouter} from "next/navigation";

export default ({switchForms}) => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const [usernameErrors, setUsernameErrors] = useState([])
    const [phoneErrors, setPhoneErrors] = useState([])
    const [emailErrors, setEmailErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])

    const register = async () => {
        setIsLoading(true)
        try {
            await registerValidation.validate(
                {username, email, password, phone}, {abortEarly: false}
            )

            setEmailErrors([])
            setUsernameErrors([])
            setPhoneErrors([])
            setPasswordErrors([])

            const res = await fetch(`/api/authentication/signup`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, email, phone, password}),
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
            const nameErr = []
            const emailErr = []
            const phoneErr = []
            const passwordErr = []
            error.inner.forEach(err => {
                switch (err.path) {
                    case "username": {
                        nameErr.push(err.message)
                        break
                    }
                    case "email": {
                        emailErr.push(err.message)
                        break
                    }
                    case "password": {
                        passwordErr.push(err.message)
                        break
                    }
                    case "phone": {
                        phoneErr.push(err.message)
                        break
                    }
                }
            })
            setUsernameErrors(nameErr)
            setEmailErrors(emailErr)
            setPhoneErrors(phoneErr)
            setPasswordErrors(passwordErr)
        }
    }

    return (
        <div className={styles['page']}>
            <div className={styles['box']}>
                <h3 className={styles['title']}>عضویت</h3>
                <p className={styles['caption']}>
                    قبلا ثبت نام کرده اید؟ <button
                    onClick={() => switchForms("login-phone")}
                    className={styles['login-link']}>وارد شوید</button>
                </p>
                <div className={styles['inputs']}>
                    <div className={styles['input-wrapper']}>
                        <input value={username} onChange={e => setUsername(e.target.value)} className={styles['input']} type="text" placeholder="نام کاربری"/>
                        <FaUser className={styles['input-icon']}/>
                    </div>
                    {
                        usernameErrors.map((err, i) => (
                            <p key={i} className={styles['err']}>{err}</p>
                        ))
                    }
                    <div className={styles['input-wrapper']}>
                        <input value={phone} onChange={e => setPhone(e.target.value)} className={styles['input']} type="text" placeholder="شماره موبایل"/>
                        <FaPhoneAlt className={styles['input-icon']}/>
                    </div>
                    {
                        phoneErrors.map((err, i) => (
                            <p key={i} className={styles['err']}>{err}</p>
                        ))
                    }
                    <div className={styles['input-wrapper']}>
                        <input value={email} onChange={e => setEmail(e.target.value)} className={styles['input']} type="text" placeholder="آدرس ایمیل"/>
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
                        :   <button onClick={register} className={styles['register']}>ثبت نام</button>
                }
            </div>
        </div>
    )
}