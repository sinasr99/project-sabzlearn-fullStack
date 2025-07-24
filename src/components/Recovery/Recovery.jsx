import {FaPhoneAlt} from "react-icons/fa";

import styles from "./Recovery.module.css"
import {useEffect, useState} from "react";
import {MdPassword} from "react-icons/md";
import {RiLock2Fill} from "react-icons/ri";
import {CircularProgress} from "@mui/material";
import {codeValidation, phoneValidation, passwordValidation} from "@/validation";
import {toast} from "react-toastify";

export default ({switchForms}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const [phoneErrors, setPhoneErrors] = useState([])
    const [codeErrors, setCodeErrors] = useState([])
    const [newPasswordErrors, setNewPasswordErrors] = useState([])

    const [level, setLevel] = useState(1)
    const [timer, setTimer] = useState(120)

    useEffect(() => {
        let interval;

        if (level === 2) {
            setTimer(120); // شروع از 120 ثانیه

            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setLevel(1) // بعد از تموم شدن تایمر، دوباره میره صفحه ورود
                        return 120; // ریست تایمر
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval); // جلوگیری از باگ تایمر قبلی
        };
    }, [level]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');

        return `${paddedMinutes} : ${paddedSeconds}`;
    }

    const sendCode = async () => {
        setIsLoading(true)
        try {
            await phoneValidation.validate(
                {phone}, {abortEarly: false}
            )

            setPhoneErrors([])

            const res = await fetch(`/api/authentication/otp/send-code`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({phone}),
            })
            const dataResponse = await res.json()

            setIsLoading(false)

            if (res.status === 201) {
                toast.success(dataResponse)
                setLevel(2)
                return true
            }
            toast.error(dataResponse)
        } catch (error) {
            setIsLoading(false)
            const phoneErr = []
            error.inner.forEach(err => {
                switch (err.path) {
                    case "phone": {
                        phoneErr.push(err.message)
                        break
                    }
                }
            })
            setPhoneErrors(phoneErr)
        }
    }

    const checkCode = async () => {
        setIsLoading(true)
        try {
            await codeValidation.validate(
                {code}, {abortEarly: false}
            )

            setCodeErrors([])

            const res = await fetch(`/api/authentication/otp/check-code`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({phone, code}),
            })
            const dataResponse = await res.json()

            setIsLoading(false)

            if (res.status === 200) {
                toast.success(dataResponse)
                setLevel(3)
                return true
            }

            setLevel(1)
            toast.error(dataResponse)
        } catch (error) {
            setIsLoading(false)
            const phoneErr = []
            error.inner.forEach(err => {
                switch (err.path) {
                    case "code": {
                        phoneErr.push(err.message)
                        break
                    }
                }
            })
            setCodeErrors(phoneErr)
        }
    }

    const checkPassword = async () => {
        setIsLoading(true)
        try {
            await passwordValidation.validate({password: newPassword}, {abortEarly: false})

            if (newPassword !== confirmNewPassword) {
                return toast.error("رمز ها با هم یکسان نیست")
            }

            const res = await fetch(`/api/authentication/change-password`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({phone, password: newPassword})
            })
            const json = await res.json()

            setIsLoading(false)

            if (res.status === 200) {
                toast.success(json)
                switchForms("login-email")
                return true
            }

            setLevel(1)
            toast.error("مشکلی پیش آمده!!")

        } catch (error) {
            setIsLoading(false)
            const passErrs = []
            error.inner.forEach(err => {
                passErrs.push(err.message)
            })
            setNewPasswordErrors(passErrs)
        }
    }

    const authLevel = level => {
        switch (level) {
            case 1 : {
                return (
                    <>
                        <div className={styles['inputs']}>
                            <div className={styles['input-wrapper']}>
                                <input value={phone} onChange={e => setPhone(e.target.value)}
                                       className={styles['input']} type="text" placeholder="شماره موبایل"/>
                                <FaPhoneAlt className={styles['input-icon']}/>
                            </div>
                            {
                                phoneErrors.map((err, i) => (
                                    <p key={i} className={styles['err']}>{err}</p>
                                ))
                            }
                        </div>
                        {
                            isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/> :
                                <button onClick={sendCode} className={styles['register']}>ادامه</button>
                        }
                    </>
                )
            }
            case 2 : {
                return (
                    <>
                        <div className={styles['inputs']}>
                            <div className={styles['input-wrapper']}>
                                <input value={code} onChange={e => setCode(e.target.value)} className={styles['input']}
                                       type="text" placeholder="کد تایید"/>
                                <MdPassword className={styles['input-icon']}/>
                            </div>
                            {
                                codeErrors.map((err, i) => (
                                    <p key={i} className={styles['err']}>{err}</p>
                                ))
                            }
                        </div>
                        <p className={styles['timer']}>{formatTime(timer)}</p>
                        {
                            isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/> :
                                <button onClick={checkCode} className={styles['register']}>تایید</button>
                        }
                    </>
                )
            }
            case 3 : {
                return (
                    <>
                        <div className={styles['inputs']}>
                            <div className={styles['input-wrapper']}>
                                <input value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                       className={styles['input']} type="password" placeholder="رمز عبور جدید"/>
                                <RiLock2Fill className={styles['input-icon']}/>
                            </div>
                            {
                                newPasswordErrors.map((err, i) => (
                                    <p key={i} className={styles['err']}>{err}</p>
                                ))
                            }
                            <div className={styles['input-wrapper']}>
                                <input value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}
                                       className={styles['input']} type="password" placeholder="تکرار رمز عبور جدید"/>
                                <RiLock2Fill className={styles['input-icon']}/>
                            </div>
                        </div>
                        {
                            isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/> :
                                <button onClick={checkPassword} className={styles['register']}>تایید رمز</button>
                        }
                    </>
                )
            }
        }
    }

    return (
        <div className={styles['page']}>
            <div className={styles['box']}>
                <h3 className={styles['title']}>بازیابی رمز</h3>
                <p className={styles['caption']}>
                    <button
                        onClick={() => switchForms("login-phone")}
                        className={styles['login-link']}>برگشت
                    </button>
                </p>
                {authLevel(level)}
            </div>
        </div>
    )
}