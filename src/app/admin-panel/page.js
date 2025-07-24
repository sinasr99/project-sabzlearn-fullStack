import styles from "./page.module.css"
import {redirect} from "next/navigation";

export default () => {
    redirect("/admin-panel/teachers")
    return (
        <></>
    )
}