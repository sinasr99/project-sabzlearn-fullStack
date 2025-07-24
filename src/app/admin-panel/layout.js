import "@/styles/style.css"
import styles from "./page.module.css"
import PanelMenu from "@/components/PanelMenu/PanelMenu";

// icons :
import {FaBookAtlas, FaComments, FaUserGroup} from "react-icons/fa6";
import { RiArticleFill } from "react-icons/ri";

import InputUserPanel from "@/components/InputUserPanel/InputUserPanel";
import {FaChalkboardTeacher, FaQuestion} from "react-icons/fa";
import {checkUser} from "@/functions";

export default async function RootLayout({children}) {
    let user = null

    user = await checkUser("Admin")

    return (
        <div className={styles['parent']}>
            <div className={styles['menu-wrapper']}>
                <PanelMenu
                    user={user}
                    links={
                        [
                            {text: "مدرس ها", href: "/admin-panel/teachers", icon: <FaChalkboardTeacher  className={styles['menu-icon']}/>},
                            {text: "کاربران", href: "/admin-panel/users", icon: <FaUserGroup  className={styles['menu-icon']}/>},
                            {text: "مقاله ها", href: "/admin-panel/articles", icon: <RiArticleFill className={styles['menu-icon']}/>},
                            {text: "دوره ها", href: "/admin-panel/courses", icon: <FaBookAtlas  className={styles['menu-icon']}/>},
                            {text: "کامنت ها", href: "/admin-panel/comments", icon: <FaComments className={styles['menu-icon']}/>}
                        ]
                    }
                />
            </div>
            <div className={styles['body']}>
                <InputUserPanel isForTeacher={true}/>
                {children}
            </div>
        </div>
    );
}
