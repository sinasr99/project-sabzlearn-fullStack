import {FaPhoneAlt} from "react-icons/fa";
import styles from "./LoginPhone.module.css"
import {useEffect, useState} from "react";
import {MdPassword} from "react-icons/md";
import {phoneValidation, codeValidation} from "@/validation";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";
import {getCookieValue} from "@/client-functions";

export default ({switchForms}) => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")

    const [phoneErrors, setPhoneErrors] = useState([])
    const [codeErrors, setCodeErrors] = useState([])

    const [isSendCode, setIsSendCode] = useState(false)
    const [timer, setTimer] = useState(120)

    useEffect(() => {
        let interval;

        if (isSendCode) {
            setTimer(120); // شروع از 120 ثانیه

            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsSendCode(false); // بعد از تموم شدن تایمر، دوباره میره صفحه ورود
                        return 120; // ریست تایمر
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval); // جلوگیری از باگ تایمر قبلی
        };
    }, [isSendCode]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');

        return `${paddedMinutes} : ${paddedSeconds}`;
    };


    const CodeWrapper = () => {
        return (
            <>
                <div className={styles['inputs']}>
                    <div className={styles['input-wrapper']}>
                        <input autoFocus value={code} onChange={e => setCode(e.target.value)}
                               className={styles['input']} type="text" placeholder="کد تایید"/>
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
                    isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                        : <button onClick={checkCode} className={styles['register']}>تایید</button>
                }
            </>
        )
    }

    const PhoneWrapper = () => {
        return (
            <>
                <div className={styles['inputs']}>
                    <div className={styles['input-wrapper']}>
                        <input autoFocus value={phone} onChange={e => setPhone(e.target.value)}
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
                    isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                        : <button onClick={sendCode} className={styles['register']}>ادامه</button>
                }
            </>
        )
    };

    const sendCode = async () => {
        if (!getCookieValue("block")) {
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
                    setIsSendCode(true)
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
        } else {
            toast.error("شما به مدت 3 دقیقه از ورود محروم شدید!!")
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
                router.push("/")
                return true
            }

            setIsSendCode(false)
            document.cookie = `block=block; max-age=180; path=/`
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

    return (
        <div className={styles['page']}>
            <div className={styles['box']}>
                <h3 className={styles['title']}>ورود با موبایل</h3>
                <p className={styles['caption']}>
                    حساب کاربری ندارید؟ <button
                    onClick={() => switchForms("signup")}
                    className={styles['login-link']}>ثبت نام کنید</button>
                </p>
                {
                    isSendCode ? <CodeWrapper/> : <PhoneWrapper/>
                }
                <div className={styles['buttons']}>
                    <button
                        onClick={() => switchForms("login-email")}
                        className={styles['link-email-login']}>ورود با ایمیل
                    </button>
                    <button
                        onClick={() => switchForms("recovery")}
                        className={styles['link-email-login']}>بازیابی رمز
                    </button>

                </div>
            </div>
        </div>

    )
}