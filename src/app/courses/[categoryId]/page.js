"use client"

import styles from "./Courses.module.css"
import Navbar from "@/components/Navbar/Navbar";
import CourseSort from "@/components/CourseSort/CourseSort";
import CourseFilter from "@/components/CourseFilter/CourseFilter";
import CourseItem from "@/components/CourseItem/CourseItem";
import Footer from "@/components/Footer/Footer";
import CustomComboBox from "@/components/CustomComboBox/CustomComboBox";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default () => {
    const {categoryId} = useParams()
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [showCourses, setShowCourses] = useState([]);
    const [search, setSearch] = useState("");

    //sort items :
    const [sortItems, setSortItems] = useState([
        {text: "همه دوره ها", selected: true},
        {text: "ارزان ترین", selected: false},
        {text: "گران ترین", selected: false},
    ]);

    // filter categories :
    const [filterFront, setFilterFront] = useState(false)
    const [filterBackend, setFilterBackend] = useState(false)

    // filter courses :
    const [filterFree, setFilterFree] = useState(false)
    const [filterBought, setFilterBought] = useState(false)

    useEffect(() => {
        getUser().then()
        getCourses().then()
    }, [])

    useEffect(() => {
        if (filterFront && filterBackend) {
            setShowCourses(courses.filter(course => {
                if (course.category.title === "فرانت اند" || course.category.title === "بک اند") {
                    return course
                }
            }))
        } else if (filterFront) {
            setShowCourses(courses.filter(course => {
                if (course.category.title === "فرانت اند") {
                    return course
                }
            }))
        } else if (filterBackend) {
            setShowCourses(courses.filter(course => {
                if (course.category.title === "بک اند") {
                    return course
                }
            }))
        }
    }, [filterFront, filterBackend])

    useEffect(() => {
        if (filterFree) {
            setShowCourses(courses.filter(course => !course.price))
        }
    }, [filterFree, filterBought]);

    const changeSortItems = newValue => {
        switch (newValue) {
            case "همه دوره ها": {
                setShowCourses(courses)
                setSortItems(prev => {
                    return prev.map(item => {
                        if (item.text === "همه دوره ها") {
                            item.selected = true
                            return item
                        }
                        item.selected = false
                        return item
                    })
                })
                break
            }
            case "گران ترین": {
                setSortItems(prev => {
                    return prev.map(item => {
                        if (item.text === "گران ترین") {
                            item.selected = true
                            return item
                        }
                        item.selected = false
                        return item
                    })
                })
                setShowCourses([...courses].sort((a, b) => b.price - a.price))
                break
            }
            case "ارزان ترین": {
                setSortItems(prev => {
                    return prev.map(item => {
                        if (item.text === "ارزان ترین") {
                            item.selected = true
                            return item
                        }
                        item.selected = false
                        return item
                    })
                })
                setShowCourses([...courses].sort((a, b) => a.price - b.price))
                break
            }
        }
    }

    const getCourses = async () => {
        const coursesResponse = await fetch(`/api/courses`)
        const json = await coursesResponse.json()
        setCourses(json.filter(course => course.category._id === categoryId))
        setShowCourses(json.filter(course => course.category._id === categoryId))
    }

    const getUser = async () => {
        const userResponse = await fetch(`/api/authentication/getme`)
        const userData = await userResponse.json();
        setUser(userData)
    }

    const doSearch = () => {
        if (search.trim()) {
            setShowCourses(courses.filter(course => course.title.toLowerCase().includes(search.toLowerCase())))
            setSearch("")
        }
    }

    return (
        <>
            <div className={styles['nav-wrapper']}>
                <Navbar user={user} hasSearch={true}/>
            </div>
            <div className="p-r-25px container">
                <div className={`${styles['header']} flex`}>
                    <h1 className={styles['title']}>دوره ها</h1>
                    <p className={styles['caption-header']}>74 دوره ی آموزشی</p>
                </div>
            </div>
            <div className="container">
                <div className="row" style={{marginBottom: "1rem"}}>
                    <div className="col-zero-12 col-lg-4 flex-all-center m-b-2" style={{alignItems: "start"}}>
                        <div className={styles['sidebar']}>
                            <CourseFilter
                                search={doSearch}
                                searchText="جستجو بین دوره ها"
                                filterBought={[filterBought, setFilterBought]}
                                filterFree={[filterFree, setFilterFree]}
                                setValue={setSearch}
                                value={search}
                                filterFront={[filterFront, setFilterFront]}
                                filterBackend={[filterBackend, setFilterBackend]}
                            />
                        </div>
                    </div>
                    <div className="col-zero-12 col-lg-8 flex-all-center">
                        <div style={{width: "100%"}} className={`${styles['left']}`}>
                            <div className={styles['combo-wrapper']}>
                                <CustomComboBox
                                    items={["همه دوره ها", "ارزان ترین", "گران ترین", "محبوب ترین"]}
                                    current="همه دوره ها"
                                />
                            </div>
                            <div className={`${styles['course-sort-wrapper']} m-b-2`}>
                                <CourseSort
                                    sortItems={sortItems}
                                    changeSort={changeSortItems}
                                />
                            </div>

                            <div className="row m-b-2">
                                {
                                    showCourses.map(course => (
                                        <div key={course._id}
                                             className="col-zero-12 col-sm-6 col-md-4 m-b-2 flex-all-center">
                                            <CourseItem
                                                category={course.category._id}
                                                courseId={course._id}
                                                notCol={true}
                                                price={course.price}
                                                title={course.title}
                                                caption={course.shortCaption}
                                                students={0}
                                                img={course.introductionPoster}
                                                offer={20}
                                                scores={5}
                                                teacher={course.creator.username}
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