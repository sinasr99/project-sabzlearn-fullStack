"use client"

import styles from "./Page.module.css"

import CreateCourseWrapper from "@/components/CreateCourseWrapper/CreateCourseWrapper";
import PanelCourses from "@/components/PanelCourses/PanelCourses";
import {useEffect, useState} from "react";

export default () => {
    const [user, setUser] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getUser().then()
    }, [])

    useEffect(() => {
        if (user) {
            getCourses().then()
        }
    }, [user])

    const getCourses = async () => {
        const res = await fetch(`/api/courses`)
        const json = await res.json()

        if (res.status === 200) {
            if (json.length) {
                setCourses(json.filter(courses => courses.creator._id === user._id))
            }
        }
    }

    const getUser = async () => {
        const res = await fetch(`/api/authentication/getme`)
        const json = await res.json()

        if (res.status === 200) {
            setUser(json)
        }
    }

    return (
        <div className={styles['wrapper']}>
            <CreateCourseWrapper getCourses={getCourses}/>
            <PanelCourses
                items={
                    courses.map(course => {
                        return {
                            title: course.title,
                            href: `/teacher-panel/courses/${course._id}`,
                            image: course.introductionPoster
                        }
                    })
                }
            />
        </div>
    )
}