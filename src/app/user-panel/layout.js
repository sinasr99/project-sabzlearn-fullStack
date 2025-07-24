import "@/styles/style.css"
import styles from "./User-Panel.module.css"
import InputUserPanel from "@/components/InputUserPanel/InputUserPanel";
import UserPanelMenu from "@/components/PanelMenu/PanelMenu";
import {RiQuestionnaireFill} from "react-icons/ri";
import {IoMdHome} from "react-icons/io";
import {AiOutlineMail} from "react-icons/ai";
import {ImFolderUpload} from "react-icons/im";
import {FaBookAtlas} from "react-icons/fa6";
import {checkUser} from "@/functions";

export default async function RootLayout({children}) {
    let user = null

    user = await checkUser("User")

    return (
        <div className={styles['wrapper']}>
            <div className={styles['menu-wrapper']}>
                <UserPanelMenu
                    user={user}
                    links={
                        [
                            {
                                text: "خانه",
                                href: "/user-panel",
                                icons: <IoMdHome className={styles['menu-body-icon']}/>
                            },
                            {
                                text: "دوره های من",
                                href: "/user-panel/courses",
                                icons: <FaBookAtlas className={styles['menu-body-icon']}/>
                            },
                            {
                                text: "اشتراک ها و تراکنش ها",
                                href: "/user-panel/transactions",
                                icons: <ImFolderUpload className={styles['menu-body-icon']}/>
                            },
                            {
                                text: "تیکت ها",
                                href: "/user-panel/tickets",
                                icons: <AiOutlineMail className={styles['menu-body-icon']}/>
                            },
                            {
                                text: "پرسش و پاسخ ها",
                                href: "/user-panel/questions",
                                icons: <RiQuestionnaireFill className={styles['menu-body-icon']}/>
                            },
                        ]
                    }
                />
            </div>
            <div className={styles['body']}>
                <div className={styles['top-bar-wrapper']}>
                    <InputUserPanel/>
                </div>
                {children}
            </div>
        </div>
    )
}
