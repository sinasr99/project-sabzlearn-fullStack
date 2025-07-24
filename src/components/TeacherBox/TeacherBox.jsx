import styles from "./TeacherBox.module.css"

import Link from "next/link"

import {FaLinkedin, FaInstagramSquare, FaTelegram, FaGithub, FaWhatsapp} from "react-icons/fa"


export default ({profile, name, caption, socialLinks, skills}) => {
    return (
        <div className={styles['teacher-box']}>
            <img className={styles['image']} src={profile} alt="Teacher Image"/>
            <h2 className={styles['name']}>{name}</h2>
            <p className={styles['caption']}>{caption}</p>
            <div className={styles['links-wrapper']}>
                {getIcons(socialLinks)}
            </div>
            {getSkills(skills)}
        </div>
    )
}

function getSkills(skills) {
    return skills.map((skill, i) => (
        <p key={i} className={styles['skill']}>{skill}</p>
    ))
}

function getIcons(socialLinks) {
    console.log(socialLinks);
    const icons = {
        telegram: {icon: <FaTelegram className={styles['social-link']}/>},
        instagram: {icon: <FaInstagramSquare className={styles['social-link']}/>},
        github: {icon: <FaGithub className={styles['social-link']}/>},
        whatsapp: {icon: <FaWhatsapp className={styles['social-link']}/>},
        linkedin: {icon: <FaLinkedin className={styles['social-link']}/>},
    }    
        return socialLinks.map((link, index) => (
        <Link href={link.href} key={index} className={styles['social-link-wrapper']}> {icons[link.icon].icon} </Link>
    ))
}