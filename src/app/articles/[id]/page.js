import styles from "./ArticlePage.module.css"

import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {MdAccountCircle, MdDateRange,} from "react-icons/md"
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import Link from "next/link";
import {FaBookOpen} from "react-icons/fa";
import CommentsWrapper from "@/components/CommentsWrapper/CommentsWrapper";
import ArticleMenuWrapper from "@/components/ArticleMenuWrapper/ArticleMenuWrapper";
import Footer from "@/components/Footer/Footer";
import {checkUserNavbar} from "@/functions";
import articles from "@/models/articles";
import commentsModel from "@/models/comments";
import PersianDate from "persian-date";
import {redirect} from "next/navigation";

export default async ({params}) => {
    let user = await checkUserNavbar()

    const {id} = await params


    const article = await articles.findOne({_id: id}).populate("creator")

    if (!article.isReady) {
        return redirect("/")
    }

    const articlesResult = await articles.find({
        isReady: true, _id: {$ne: article._id}
    }).populate("creator")

    console.log("articles => ", articlesResult)
    console.log("a => ", article)

    let comments = await commentsModel.find()
        .populate("creator") // برای خود کامنت
        .populate("courseId") // اختیاری
        .populate("articleId") // اختیاری
        .populate({
            path: "reply.creator", // populate کردن creator داخل reply
            model: "Users"
        })

    comments = comments.filter(comment => {
        if (comment?.isAgree && comment?.articleId?._id.toString() === id.toString()) {
            return comment
        }
    })

    const getPersianDate = englishDate => {
        const createdAt = new Date(englishDate)

        return new PersianDate(createdAt).format('YYYY/MM/DD')
    }

    const getRole = role => {
        switch (role) {
            case "Admin": {
                return "مدیر"
            }
            case "Teacher": {
                return "مدرس"
            }
            case "User": {
                return "کاربر"
            }
        }

    }

    return (<>
            <div className="nav-wrapper">
                <Navbar user={user} hasSearch={true}/>
            </div>

            <div className="container">
                <Breadcrumb path={[{text: "خانه", href: ""}, {text: "مقاله ها", href: "articles"}, {
                    text: article.title,
                    href: article._id.toString()
                },]}/>

                <div className={styles['article-wrapper']}>
                    <h1 className={styles['article-title']}>{article.title}</h1>

                    <div className={styles['article-info-wrapper']}>
                        <p className={styles['article-info-item']}>
                            <MdAccountCircle className={styles['article-info-icon']}/>
                            {article.creator.username}
                        </p>
                    </div>

                    <div
                        className={styles['article-content']}
                        dangerouslySetInnerHTML={{__html: article.body}}
                    />
                </div>

                <div className={styles['article-recommend']}>
                    <h5 className={styles['article-recommend-title']}>
                        <FaBookOpen className={styles['article-recommend-icon']}/>
                        پیشنهاد مطالعه
                    </h5>

                    <div className={styles['articles-recommend-wrapper']}>
                        {articlesResult.map(article => (
                            <div key={article._id} className={styles['article-recommend-item']}>
                                <img className={styles['article-recommend-image']} src={article.poster}
                                     alt="Article Image"/>
                                <div className={styles['article-item-content']}>
                                    <Link className={styles['article-item-link']} href={`/articles/${article._id}`}>زبان
                                        برنامه
                                        نویسی بازی call of duty</Link>
                                    <span className={styles['article-item-date']}>
                                    <MdDateRange className={styles['calender-icon']}/>
                                    21/06/104
                                </span>
                                </div>
                            </div>))}
                    </div>
                </div>

                <div className={styles['article-comments']}>
                    <CommentsWrapper person="Sina Saber" comments={comments.map(comment => {
                        return {
                            itemId: comment.articleId._id.toString(),
                            id: comment._id.toString(),
                            name: comment.creator.username,
                            createdDate: getPersianDate(comment.createdAt),
                            profile: comment.creator.profile,
                            role: getRole(comment.creator.role),
                            message: comment.message,
                            answers: comment.reply.map(answer => {
                                return {
                                    name: answer.creator.username,
                                    message: answer.message,
                                    role: getRole(answer.creator.role),
                                    createdDate: getPersianDate(answer.createdAt),
                                    profile: answer.creator.profile
                                }
                            })
                        }
                    })}
                    />
                </div>
            </div>

            <Footer/>
        </>)
}