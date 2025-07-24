import styles from "./User-Panel.module.css"

import {MdMenuBook} from "react-icons/md";
import {FaPlay, FaLongArrowAltLeft} from "react-icons/fa"
import {GrOrganization} from "react-icons/gr";
import Link from "next/link";

export default () => {
    return (
        <>
            <div className={styles['info-wrapper']}>
                <div className={styles['info-item']}>
                    <img className={styles['info-item-icon']} src="/images/course-icon.png"
                         alt="Question Icon"/>
                    <div className={styles['info-content-wrapper']}>
                        <h5 className={styles['info-title-value']}>18 دوره</h5>
                        <p className={styles['info-item-key']}>دوره های من</p>
                    </div>
                </div>
                <div className={styles['info-item']}>
                    <img className={styles['info-item-icon']} src="/images/ticket-icon.png"
                         alt="Question Icon"/>
                    <div className={styles['info-content-wrapper']}>
                        <h5 className={styles['info-title-value']}>5 تیکت</h5>
                        <p className={styles['info-item-key']}>تیکت ها</p>
                    </div>
                </div>
                <div className={styles['info-item']}>
                    <img className={styles['info-item-icon']} src="/images/question-icon.png"
                         alt="Question Icon"/>
                    <div className={styles['info-content-wrapper']}>
                        <h5 className={styles['info-title-value']}>11 پرسش</h5>
                        <p className={styles['info-item-key']}>پرسش پاسخ</p>
                    </div>
                </div>
                <div className={styles['info-item']}>
                    <img className={styles['info-item-icon']} src="/images/wallet-icon.png"
                         alt="Question Icon"/>
                    <div className={styles['info-content-wrapper']}>
                        <h5 className={styles['info-title-value']}>0 تومان</h5>
                        <p className={styles['info-item-key']}>کیف پول</p>
                    </div>
                </div>
            </div>
            <div className={styles['history-teachers']}>
                <div className={styles['history-course-title-wrapper']}>
                    <h5 className={styles['history-teachers-title']}>اخیرا مشاهده شده</h5>
                    <Link href="#" className={styles['link-icon-wrapper']}>
                        <FaLongArrowAltLeft className={styles['arrow-icon']}/>
                    </Link>
                </div>
                <div className="row">
                    <div className={`col-zero-12 col-md-6 col-lg-4 flex-all-center m-b-2`}>
                        <div className={styles['history-course-item']}>
                            <Link href="#" className={styles['course-poster-wrapper']}>
                                <img className={styles['course-poster']} src="/images/course-1.webp" alt=""/>
                                <FaPlay className={styles['play-icon']}/>
                            </Link>
                            <Link href="#" className={styles['course-history-title']}>آموزش پروژه محور CSS Grid +
                                پروژه لندینگ
                                رستوران
                            </Link>
                            <div className={styles['course-view-percent-wrapper']}>
                                <span className={styles['percent-value']}>18%</span>
                                <div className={styles['percent-wrapper']}>
                                    <div style={{width: "18%"}} className={styles['percent-navbar']}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-zero-12 col-md-6 col-lg-4 flex-all-center m-b-2`}>
                        <div className={styles['history-course-item']}>
                            <Link href="#" className={styles['course-poster-wrapper']}>
                                <img className={styles['course-poster']} src="/images/course-1.webp" alt=""/>
                                <FaPlay className={styles['play-icon']}/>
                            </Link>
                            <Link href="#" className={styles['course-history-title']}>آموزش پروژه محور CSS Grid +
                                پروژه لندینگ
                                رستوران</Link>
                            <div className={styles['course-view-percent-wrapper']}>
                                <span className={styles['percent-value']}>18%</span>
                                <div className={styles['percent-wrapper']}>
                                    <div style={{width: "18%"}} className={styles['percent-navbar']}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-zero-12 col-md-6 col-lg-4 flex-all-center m-b-2`}>
                        <div className={styles['history-course-item']}>
                            <Link href="#" className={styles['course-poster-wrapper']}>
                                <img className={styles['course-poster']} src="/images/course-1.webp" alt=""/>
                                <FaPlay className={styles['play-icon']}/>
                            </Link>
                            <Link href="#" className={styles['course-history-title']}>آموزش پروژه محور CSS Grid +
                                پروژه لندینگ
                                رستوران</Link>
                            <div className={styles['course-view-percent-wrapper']}>
                                <span className={styles['percent-value']}>18%</span>
                                <div className={styles['percent-wrapper']}>
                                    <div style={{width: "18%"}} className={styles['percent-navbar']}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-zero-12 col-md-6 col-lg-4 flex-all-center m-b-2`}>
                        <div className={styles['history-course-item']}>
                            <Link href="#" className={styles['course-poster-wrapper']}>
                                <img className={styles['course-poster']} src="/images/course-1.webp" alt=""/>
                                <FaPlay className={styles['play-icon']}/>
                            </Link>
                            <Link href="#" className={styles['course-history-title']}>آموزش پروژه محور CSS Grid +
                                پروژه لندینگ
                                رستوران</Link>
                            <div className={styles['course-view-percent-wrapper']}>
                                <span className={styles['percent-value']}>18%</span>
                                <div className={styles['percent-wrapper']}>
                                    <div style={{width: "18%"}} className={styles['percent-navbar']}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['ticket-question-wrapper']}>
                <div className={styles['ticket-wrapper']}>
                    <div className={styles['section-item-header']}>
                        <h4 className={styles['section-title']}>تیکت های اخیر</h4>
                        <Link href="#" className={styles['link-icon-wrapper']}>
                            <FaLongArrowAltLeft className={styles['arrow-icon']}/>
                        </Link>
                    </div>
                    <div className={styles['section-items-wrapper']}>
                        <div className={styles['section-item']}>
                            <div className={styles['section-item-header']}>
                                <p className={styles['section-item-title']}>ویدئو</p>
                                <Link className={styles['section-item-link']} href="#">
                                    مشاهده
                                    <FaLongArrowAltLeft className={styles['section-item-icon']}/>
                                </Link>
                            </div>
                            <div className={styles['section-item-body']}>
                                <div className={styles['section-body-right']}>
                                    <p className={styles['section-item-title']}>
                                        <GrOrganization className={styles['organization-icon']}/>
                                        دپارتمان
                                    </p>
                                    <span className={styles['organize-title']}>پشتیانی</span>
                                </div>
                                <div className={styles['section-body-left']}>
                                    بسته شده
                                </div>
                            </div>
                        </div>
                        <div className={styles['section-item']}>
                            <div className={styles['section-item-header']}>
                                <p className={styles['section-item-title']}>ویدئو</p>
                                <Link className={styles['section-item-link']} href="#">
                                    مشاهده
                                    <FaLongArrowAltLeft className={styles['section-item-icon']}/>
                                </Link>
                            </div>
                            <div className={styles['section-item-body']}>
                                <div className={styles['section-body-right']}>
                                    <p className={styles['section-item-title']}>
                                        <GrOrganization className={styles['organization-icon']}/>
                                        دپارتمان
                                    </p>
                                    <span className={styles['organize-title']}>پشتیانی</span>
                                </div>
                                <div className={styles['section-body-left']}>
                                    بسته شده
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['question-wrapper']}>
                    <div className={styles['section-item-header']}>
                        <h4 className={styles['section-title']}> پرسش های اخیر</h4>
                        <Link href="#" className={styles['link-icon-wrapper']}>
                            <FaLongArrowAltLeft className={styles['arrow-icon']}/>
                        </Link>
                    </div>
                    <div className={styles['section-items-wrapper']}>
                        <div className={styles['section-item']}>
                            <div className={styles['section-item-header']}>
                                <p className={styles['section-item-title']}>توی next js ورژن 13 به بالا به صورت
                                    پی?
                                    ...</p>
                            </div>
                            <div className={styles['section-item-body']}>
                                <div className={styles['section-body-right']}>
                                    <p className={styles['section-item-title']}>
                                        <MdMenuBook className={styles['organization-icon']}/>
                                        آموزش Next.js
                                    </p>
                                </div>
                                <div className={styles['section-body-left']}>
                                    بسته شده
                                </div>
                            </div>
                        </div>
                        <div className={styles['section-item']}>
                            <div className={styles['section-item-header']}>
                                <p className={styles['section-item-title']}>توی next js ورژن 13 به بالا به صورت
                                    پی?
                                    ...</p>
                            </div>
                            <div className={styles['section-item-body']}>
                                <div className={styles['section-body-right']}>
                                    <p className={styles['section-item-title']}>
                                        <MdMenuBook className={styles['organization-icon']}/>
                                        آموزش Next.js
                                    </p>
                                </div>
                                <div className={styles['section-body-left']}>
                                    بسته شده
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}