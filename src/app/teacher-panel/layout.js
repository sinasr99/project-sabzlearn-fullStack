import "@/styles/style.css"
import styles from "./TeacherPage.module.css"
import PanelMenu from "@/components/PanelMenu/PanelMenu";
import { FaBookAtlas, FaComments } from "react-icons/fa6";
import { RiArticleFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import InputUserPanel from "@/components/InputUserPanel/InputUserPanel";
import {checkUser, decodeToken} from "@/functions";
import {redirect} from "next/navigation";
export default async function RootLayout({children}) {
    let user = null

    user = await checkUser("Teacher")

    if (!user) {
        return redirect("/")
    }

    return (
        <div className={styles['parent']}>
            <div className={styles['menu-wrapper']}>
                <PanelMenu
                    user={user}
                    links={
                        [
                            {text: "خانه", href: "/teacher-panel", icon: <IoMdHome className={styles['menu-icon']}/>},
                            {text: "دوره ها", href: "/teacher-panel/courses", icon: <FaBookAtlas className={styles['menu-icon']}/>},
                            {text: "مقاله", href: "/teacher-panel/articles", icon: <RiArticleFill className={styles['menu-icon']}/>},
                            {text: "کامنت", href: "/teacher-panel/comments", icon: <FaComments className={styles['menu-icon']}/>},
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
