"use client"

import Navbar from "@/components/Navbar/Navbar";

import styles from './Articles.module.css'
import CourseFilter from "@/components/CourseFilter/CourseFilter";
import ArticleBox from "@/components/ArticleBox/ArticleBox";
import CourseSort from "@/components/CourseSort/CourseSort";
import Footer from "@/components/Footer/Footer";
import CustomComboBox from "@/components/CustomComboBox/CustomComboBox";
import {useEffect, useState} from "react";

export default () => {
    const [search, setSearch] = useState("")
    const [user, setUser] = useState(null)
    const [comments, setComments] = useState([])
    const [articles, setArticles] = useState([])
    const [showArticles, setShowArticles] = useState([])
    const [sortItems, setSortItems] = useState([
        {text: "همه مقاله ها", selected: true},
        {text: "بیشترین کامنت", selected: false},
    ]);

    const getUser = async () => {
        const userResponse = await fetch(`/api/authentication/getme`)
        const userData = await userResponse.json();

        if (userResponse.status === 200) {
            setUser(userData)
        }
    }

    const getArticles = async () => {
        const res = await fetch(`/api/articles`)
        const data = await res.json()
        setArticles(data.filter(article => article.isReady))
        setShowArticles(data.filter(article => article.isReady))
    }

    useEffect(() => {
        getUser().then()
        getArticles().then()
        getComments().then()
    }, []);

    const getComments = async () => {
        const res = await fetch(`/api/comments`)
        const data = await res.json()
        setComments(data)
    }

    const changeSortItems = newValue => {
        switch (newValue) {
            case "همه مقاله ها": {
                setShowArticles(articles)
                setSortItems(prev => {
                    return prev.map(item => {
                        if (item.text === "همه مقاله ها") {
                            item.selected = true
                            return item
                        }
                        item.selected = false
                        return item
                    })
                })
                break
            }
            case "بیشترین کامنت": {
                setSortItems(prev => {
                    return prev.map(item => {
                        if (item.text === "بیشترین کامنت") {
                            item.selected = true
                            return item
                        }
                        item.selected = false
                        return item
                    })
                })
                let newArticles = articles.map(article => {
                    let number = 0

                    comments.forEach(comment => {
                        // بررسی اینکه comment.articleId وجود داره
                        const commentArticleId =
                            comment?.articleId?._id?.toString?.() ||
                            comment?.articleId?.toString?.()

                        if (commentArticleId && commentArticleId === article._id.toString()) {
                            number++
                        }
                    })

                    return {...article, number}
                })
                setShowArticles([...newArticles].sort((a, b) => b.number - a.number))
                break
            }
        }
    }

    const doSearch = () => {
        const searchInput = search.trim()
        if (searchInput) {
            setShowArticles(articles.filter(article => article.title.toLowerCase().includes(searchInput.toLowerCase())))
        }
    }

    return (
        <>
            <div className={styles['nav-wrapper']}>
                <Navbar user={user} hasSearch={true}/>
            </div>
            <div className="p-r-25px container">
                <div className={styles['header']}>
                    <h2 className={styles['title']}>مقاله ها</h2>
                    <p className={styles['caption-header']}>451 مقاله</p>
                </div>

                <div className={styles['course-and-sort-container']}>
                    <div className={`flex wrap`}>
                        <div className="right">
                            <CourseFilter
                                search={doSearch}
                                value={search}
                                setValue={setSearch}
                                onlySearch={true}
                                searchText="جستجو بین مقاله ها"
                            />
                        </div>
                        <div className="left m-b-2" style={{width: "100%"}}>
                            <div className={`flex-all-center ${styles['combo-wrapper']}`}>
                                <CustomComboBox
                                    items={["عادی", "جدیدترین", "قدیمی ترین", "پر نظر ها"]}
                                    current="عادی"
                                />
                            </div>

                            <div className={styles['sort-wrapper']}>
                                <CourseSort
                                    searchText="جستجو بین مقاله ها"
                                    sortItems={sortItems}
                                    changeSort={changeSortItems}
                                />
                            </div>

                            <div className="row" style={{margin: "2rem 0 0"}}>
                                {
                                    showArticles.map(article => (
                                        <div key={article._id}
                                             className='m-b-2 col-zero-12 col-sm-6 col-lg-4 flex-all-center'>
                                            <ArticleBox
                                                id={article._id}
                                                title={article.title}
                                                caption="اگه حتی یه بار وارد دنیای “Call of Duty: Warzone 2.0” شده باشی، می‌دونی با یه بازی معمولی طرف نیستی. صداها واقعی‌تر از"
                                                date="1404/03/22"
                                                image={article.poster}
                                                writer={article.creator.username}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}