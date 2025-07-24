import styles from "./Footer.module.css"

import {FaInstagram, FaLinkedin, FaTelegram, FaPhone } from "react-icons/fa"
import { MdEmail } from "react-icons/md";
import Link from "next/link";



export default () => {
    return (
        <footer className={styles['footer-wrapper']}>
            <div className="container">
                <div className={styles['header']}>
                    <div className={styles['right']}>
                        <img src="/images/logo.png" alt="Logo Sabzlearn" className={styles['logo']}/>
                        <h2 className={styles['title']}>سبزلرن</h2>
                    </div>
                    <div className={styles['left']}>
                        <div className={styles['social-wrapper']}>
                            <FaTelegram className={styles['social']}/>
                        </div>
                        <div className={styles['social-wrapper']}>
                            <FaInstagram className={styles['social']}/>
                        </div>
                        <div className={styles['social-wrapper']}>
                            <FaLinkedin className={styles['social']}/>
                        </div>
                    </div>
                </div>
                <div className={styles['contact']}>
                    <p className={styles['contact-item']}>
                        <FaPhone className={styles['contact-icon']}/>
                        09056408450
                    </p>
                    <p className={styles['contact-item']}>
                        <MdEmail className={styles['contact-icon']}/>
                        sina.sr.21.09.1383@gmail.com
                    </p>
                </div>
                <div className={styles['body']}>
                    <div className={styles['body-item']}>
                        <h3 className={styles['body-item__title']}>درباره سبزلرن</h3>
                        <p className={styles['body-item__caption']}>شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی، با خیال راحت و بدون استرس میتونی از مسیر لذت ببری. ما در سبزلرن، توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد کنیم و از نتیجه زحمات مون لذت ببریم.</p>
                    </div>
                    <div className={styles['body-item']}>
                        <h3 className={styles['body-item__title']}>دوره های پرطرفدار</h3>
                        <Link className={styles['body-item__link']} href="#">آموزش پایتون</Link>
                        <Link className={styles['body-item__link']} href="#">دوره طراحی قالب حرفه ای</Link>
                        <Link className={styles['body-item__link']} href="#">مستر فریلنس</Link>
                        <Link className={styles['body-item__link']} href="#">آموزش BootStrap</Link>
                    </div>
                    <div className={styles['body-item']}>
                        <h3 className={styles['body-item__title']}>دسترسی سریع</h3>
                        <Link className={styles['body-item__link']} href="#">قوانین و مقررات</Link>
                        <Link className={styles['body-item__link']} href="#">ارسال تیکت</Link>
                        <Link className={styles['body-item__link']} href="#">همه دوره ها</Link>
                    </div>
                    <img className={styles['e-icon']} src="/images/enamad.png" alt="Enamad Logo"/>
                </div>
                <div className={styles['bottom']}>
                    <p className={styles['bottom-content']}>کلیه حقوق مادی و معنوی سایت برای سبز لرن محفوظ است.</p>
                    <p className={styles['bottom-content']}>ساخته شده با ❤️ در سبزلرن</p>
                </div>
            </div>
        </footer>
    )
}