import styles from './TicketDetail.module.css'
import {FaArrowLeft} from "react-icons/fa";
import Link from "next/link"

export default () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <p className={styles['title']}>ویدئو</p>
                <Link className={styles['comeback']} href="/user-panel/tickets">
                    بازگشت
                    <FaArrowLeft className={styles['icon-back']}/>
                </Link>
            </div>
            <div className={styles['body']}>
                <div className={styles['my-comment-wrapper']}>
                    <div>
                        <p className={styles['my-comment']}>
                            یعنی اعصابم بهم ریخت چه وضعیه یه وسدئو بالا نمیاد اکه دوره نکست رو آنلاین نکرده بودین انقدر اذیت نمیشدم کلی وقتم حروم شد

                            همه سایت ها دارن دوره دانلود ارائه میدن دوره شما هم هی دانلودی می بود چه فرقی میکردم اعصابم یهم ریخت کلی وقت ازم رفت همین بود نتیجش حالا ارزششو داشت ؟
                        </p>
                        <span className={styles['clock']}>
                        شما <FaArrowLeft className={styles['arrow-icon']}/> 18 : 40
                    </span>
                    </div>
                </div>
                <div className={styles['my-comment-wrapper']}>
                    <div>
                        <p className={styles['my-comment']}>
                            یعنی اعصابم بهم ریخت چه وضعیه یه وسدئو بالا نمیاد اکه دوره نکست رو آنلاین نکرده بودین انقدر اذیت نمیشدم کلی وقتم حروم شد

                            همه سایت ها دارن دوره دانلود ارائه میدن دوره شما هم هی دانلودی می بود چه فرقی میکردم اعصابم یهم ریخت کلی وقت ازم رفت همین بود نتیجش حالا ارزششو داشت ؟
                        </p>
                        <span className={styles['clock']}>
                        شما <FaArrowLeft className={styles['arrow-icon']}/> 18 : 40
                    </span>
                    </div>
                </div>
                <div className={styles['my-comment-wrapper']}>
                    <div>
                        <p className={styles['my-comment']}>
                            یعنی اعصابم بهم ریخت چه وضعیه یه وسدئو بالا نمیاد اکه دوره نکست رو آنلاین نکرده بودین انقدر اذیت نمیشدم کلی وقتم حروم شد

                            همه سایت ها دارن دوره دانلود ارائه میدن دوره شما هم هی دانلودی می بود چه فرقی میکردم اعصابم یهم ریخت کلی وقت ازم رفت همین بود نتیجش حالا ارزششو داشت ؟
                        </p>
                        <span className={styles['clock']}>
                        شما <FaArrowLeft className={styles['arrow-icon']}/> 18 : 40
                    </span>
                    </div>
                </div>
                <div className={styles['person-comment-wrapper']}>
                   <div>
                       <p className={styles['person-comment']}>
                           سلام و عرض ادب 🌿

                           از پیام شما ممنونیم و بابت اختلالات پیش‌آمده صمیمانه عذرخواهی می‌کنیم.

                           در حال حاضر به‌دلیل شرایط خاص و ناپایداری‌های گسترده در زیرساخت‌های اینترنت کشور، دسترسی به وب‌سایت سبزلرن در بسیاری از موقعیت‌ها تنها از طریق VPN ممکنه.



                           با این حال، متأسفانه از ساعاتی پیش پخش ویدیوها نیز با مشکل مواجه شده که در حال بررسی و رفع سریع اون توسط تیم فنی هستیم. اگر مشکل ادامه‌دار باشه، حتی گزینه‌هایی مثل جابجایی کامل سرورها هم در دست بررسی قرار می‌گیره تا هر چه زودتر دسترسی پایدار و بی‌دردسر برقرار بشه.

                           ما ارزش زیادی برای همراهی و اعتماد شما قائل هستیم و همه توان خودمون رو برای رفع مشکل به‌کار گرفتیم.



                           برای اطلاع از آخرین وضعیت و به‌روزرسانی‌ها حتماً در کانال زیر عضو باشید:

                           🔗 https://t.me/sabzlearn

                           از صبوری و درکتون سپاسگزاریم 🙏
                       </p>
                       <span className={styles['clock']}>
                        شهرام خندقی <FaArrowLeft className={styles['arrow-icon']}/> 20 : 30
                    </span>
                   </div>
                </div>
                <div className={styles['person-comment-wrapper']}>
                    <div>
                        <p className={styles['person-comment']}>
                            این تیکت به صورت اتوماتیک بسته شد
                        </p>
                        <span style={{margin: "0.5rem auto 0"}} className={styles['clock']}>
                        شهرام خندقی <FaArrowLeft className={styles['arrow-icon']}/> 20 : 40
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}