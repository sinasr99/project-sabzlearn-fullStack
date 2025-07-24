"use client"

import styles from "./page.module.css"
import CreateCourseWrapper from "@/components/CreateCourseWrapper/CreateCourseWrapper";
import PanelCourses from "@/components/PanelCourses/PanelCourses";
import CustomComboBox from "@/components/CustomComboBox/CustomComboBox";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default () => {
    const [courses, setCourses] = useState([])
    const [showCourses, setShowCourses] = useState([])
    const [user, setUser] = useState(null)
    const [currentFilter, setCurrentFilter] = useState("همه دوره ها")
    const [loaders, setLoaders] = useState([])

    useEffect(() => {
        getCourses().then()
        getUser().then()
    }, [])

    useEffect(() => {
        if (courses.length) {
            setLoaders(courses.map(item => false))
        }
    }, [courses])

    const getUser = async () => {
        const resUser = await fetch(`/api/authentication/getme`)
        const userResult = await resUser.json()
        setUser(userResult)
    }

    const getCourses = async () => {
        const res = await fetch(`/api/courses`)
        const json = await res.json()

        if (res.status === 200) {
            setCourses(json)
            setShowCourses(json)
        }
        toast.error(json)
    }

    const removeCourse = async (id, index) => {
        setLoaders(prev => {
            return prev.map((item, i) => {
                return i === index
            })
        })

        const res = await fetch(`/api/courses/${id}`, {
            method: "DELETE"
        })
        const json = await res.json()

        setLoaders(prev => {
            return prev.map((item, i) => {
                return i === index ? false : false
            })
        })

        if (res.status === 200) {
            getCourses().then()
            return toast.success(json)
        }
        toast.error(json)
    }

    const setFilter = text => {
        switch (text) {
            case "همه دوره ها": {
                setShowCourses(courses)
                break
            }
            case "دوره های من": {
                setShowCourses(courses.filter(course => {
                    return course.creator._id === user._id
                }))
                break
            }
        }
    }

    return (
        <div className={styles['wrapper']}>
            <CreateCourseWrapper getCourses={getCourses}/>
            <div className={styles['courses']}>
                <div className={styles['courses-header']}>
                    <h3 className={styles['courses-title']}>لیست دوره ها</h3>
                    <CustomComboBox
                        setFilter={setFilter}
                        items={
                            ["همه دوره ها","دوره های من"]
                        }
                        current={currentFilter}
                    />
                </div>
                <PanelCourses
                    removeButton={removeCourse}
                    items={
                        showCourses.map((item, i) => {
                            return {
                                isLoading: loaders[i],
                                id: item._id,
                                title: item.title,
                                href: `/admin-panel/courses/${item._id}`,
                                image: item.introductionPoster
                            }
                        })
                    }
                />
            </div>
        </div>
    )
}