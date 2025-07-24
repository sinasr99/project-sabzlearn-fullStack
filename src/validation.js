import * as yup from "yup"

export const loginValidation = yup.object({
    email: yup.string()
        .required("فیلد اییمیل اجباری است")
        .matches(
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            "ایمیل باید به این شکل باشد : sina12@gmail.com"
        ),
    password: yup.string()
        .required("رمز عبور الزامی است")
        .min(8, "رمز عبور حداقل باید 8 کاراکتر باشد")
        .max(15, "رمز عبور حداکثر باید 15 کاراکتر باشد")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/,
            "رمز عبور باید شمال حروف کوچک و بزرگ و اعداد و کاراکتر های خاص مثل #$ باشد"
        )
})

export const codeValidation = yup.object({
    code: yup.string()
        .required("وارد کردن کد الزامی است")
        .matches(/^\d{4}$/, "کد باید فقط شامل ۴ رقم عددی باشد")
})

export const phoneValidation = yup.object({
    phone: yup.string()
        .required("فیلد تلفن الزامی است")
        .matches(
            /^09\d{9}$/,
            "سینتکس تلفن باید به این شکل باشد 4598...0901"
        )
        .length(11, "فیلد تلفن باید 11 کاراکتر باشد")
})

export const registerValidation = yup.object({
    username: yup.string()
        .required("فیلد نام اجباری است")
        .min(3, "نام کاربری زیر 3 کاراکتر مجاز نیست :)")
        .max(25, "نام کاربری بالای 25 کاراکتر مجاز نیست :)")
        .matches(/^[\u0600-\u06FFa-zA-Z0-9_]+$/,
            "نام کاربری میتواند شامل حروف و اعداد انگلیسی و فارسی و _ باشد"
        ),
    email: yup.string()
        .required("فیلد اییمیل اجباری است")
        .matches(
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            "ایمیل باید به این شکل باشد : sina12@gmail.com"
        ),
    phone: yup.string()
        .required("فیلد تلفن اجباری است")
        .matches(
            /^09\d{9}$/,
            "سینتکس تلفن باید به این شکل باشد 4598...0901"
        )
        .length(11, "فیلد تلفن باید 11 کاراکتر باشد"),
    password: yup.string()
        .required("رمز عبور الزامی است")
        .min(8, "رمز عبور حداقل باید 8 کاراکتر باشد")
        .max(15, "رمز عبور حداکثر باید 15 کاراکتر باشد")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/,
            "رمز عبور باید شمال حروف کوچک و بزرگ و اعداد و کاراکتر های خاص مثل #$ باشد"
        )
})

export const passwordValidation = yup.object({
    password: yup.string()
        .required("رمز عبور الزامی است")
        .min(8, "رمز عبور حداقل باید 8 کاراکتر باشد")
        .max(15, "رمز عبور حداکثر باید 15 کاراکتر باشد")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/,
            "رمز عبور باید شمال حروف کوچک و بزرگ و اعداد و کاراکتر های خاص مثل #$ باشد"
        )
})