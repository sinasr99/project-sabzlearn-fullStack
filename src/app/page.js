//=-=-=-=-=-=-=-=-=-=- Styles =-=-=-=-=-=-=-=-=-=-
import styles from "@/styles/home.module.css"
//=-=-=-=-=-=-=-=-=-=- Components =-=-=-=-=-=-=-=-=-=-
import Navbar from "@/components/Navbar/Navbar";
import Search from "@/components/Search/Search";
import {PiStudentFill} from "react-icons/pi";
import {FaPuzzlePiece, FaPython, FaShieldAlt, FaLaptopCode, FaClock, FaBookOpen, FaClipboard} from "react-icons/fa";
import InfoIcon from "@/components/InfoIcon/InfoIcon";
import {MdKeyboardArrowDown} from "react-icons/md";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import CourseItem from "@/components/CourseItem/CourseItem";
import CategoryItem from "@/components/CategoryItem/CategoryItem";
import {FaBookAtlas, FaChartSimple, FaMessage} from "react-icons/fa6";
import SwiperWithButtons from "@/components/SwiperWithButtons/SwiperWithButtons";
import OurServiceBox from "@/components/OurServiceBox/OurServiceBox";
import ArticleBox from "@/components/ArticleBox/ArticleBox";
import Description from "@/components/Description/Description";
import Footer from "@/components/Footer/Footer";
import {checkUserNavbar} from "@/functions";
import coursesModel from "@/models/courses";
import episodesModel from "@/models/episodes"
import seasons from "@/models/seasons"
import users from "@/models/users";
import connectToMongo from "@/database/connectToMongo";
import categoriesModel from "@/models/categories";
import articlesModel from "@/models/articles";

export const revalidate = 86400

export default async function Home() {
    let user = null

    user = await checkUserNavbar()

    connectToMongo()

    let categories = await categoriesModel.find()

    const courses = await coursesModel.find()
        .populate({
            path: "parts",
            model: "Seasons",
            populate: {
                path: "episodes",
                model: "Episodes"
            }
        })
        .populate({
            path: "creator",
            model: "Users"
        })

    categories = categories.map(category => {
        let number = 0
        courses.forEach(course => {
            if (course.category.toString() === category._id.toString()) {
                number++
            }
        })
        return {...category, number}
    })

    const newCourses = courses.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    const articles = await articlesModel.find().populate("creator")
    const showArticles = articles.filter(article => article.isReady)

    return (
        <>
            <div className={styles['header']}>
                <div className={styles['header-wrapper']}>
                    <div className="container">
                        <button className={styles['icon-down-wrapper']}>
                            <MdKeyboardArrowDown className={styles['header-icon-down']}/>
                        </button>

                        <div className={styles['nav-wrapper']}>
                            <Navbar user={user}/>
                        </div>
                        <h1 className={styles['header-title']}>سبزلرن، اولین گام برنامه‌نویس شدن</h1>
                        <p className={styles['header-caption']}>با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت
                            یاد
                            بگیر و پیشرفت کن</p>
                        <Search/>
                        <div className={styles['infos']}>
                            <InfoIcon
                                icon={<FaClock className={styles['info-icon']}/>}
                                title="ساعت آموزش"
                                count={1500}
                            />
                            <InfoIcon
                                icon={<PiStudentFill className={styles['info-icon']}/>}
                                title="دانشجو"
                                count={179_501}
                            />
                            <InfoIcon
                                icon={<FaBookAtlas className={styles['info-icon']}/>}
                                title="دوره آموزشی"
                                count={50}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <section className={styles['section-teachers']}>
                <div className="container">
                    <SectionHeader
                        title="آخرین دوره ها"
                        caption="سکوی پرتاپ شما به سمت موفقیت"
                        link={{text: "همه دوره ها", href: "/teachers"}}
                    />
                    <div className="row">
                        {
                            courses.reverse().map(course => (
                                <CourseItem
                                    category={course.category._id}
                                    courseId={course._id}
                                    key={course._id}
                                    col={3}
                                    price={course.price}
                                    title={course.title}
                                    caption={course.shortCaption}
                                    students={0}
                                    img={course.introductionPoster}
                                    offer={20}
                                    scores={5}
                                    teacher={course.creator.username}
                                />
                            ))
                        }
                    </div>
                    <SectionHeader
                        title="نقشــه راه ها"
                        caption="نقشه های راه برای شروع اصولی یادگیری"
                    />
                    {
                        categories.length ?
                            <div className="m-b-2 row">
                                <div className="col-xl-3 col-lg-6 col-md-6 col-zero-12 flex-all-center m-b-2">
                                    <CategoryItem
                                        href={"/courses/" + categories[0]._doc._id}
                                        col={3}
                                        value={categories[0].number + " دوره"}
                                        icon={<FaLaptopCode className={styles['icon-category']}/>}
                                        title={categories[0]._doc.title}
                                        fromColor="#FEAA38"
                                        toColor="#F33358"
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-zero-12 flex-all-center m-b-2">
                                    <CategoryItem
                                        href={"/courses/" + categories[1]._doc._id}
                                        col={3}
                                        value={categories[1].number + " دوره"}
                                        icon={<FaShieldAlt className={styles['icon-category']}/>}
                                        title={categories[1]._doc.title}
                                        fromColor="#2FCAD1"
                                        toColor="#29E16D"
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-zero-12 flex-all-center m-b-2">
                                    <CategoryItem
                                        href={"/courses/" + categories[2]._doc._id}
                                        col={3}
                                        value={`${categories[2].number} دوره`}
                                        icon={<FaPython className={styles['icon-category']}/>}
                                        title={categories[2]._doc.title}
                                        fromColor="#3D91FE"
                                        toColor="#9738F7"
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-zero-12 flex-all-center m-b-2">
                                    <CategoryItem
                                        href={"/courses/" + categories[3]._doc._id}
                                        col={3}
                                        value={`${categories[3].number} دوره`}
                                        icon={<FaPuzzlePiece className={styles['icon-category']}/>}
                                        title={categories[3]._doc.title}
                                        fromColor="#F43071"
                                        toColor="#920574"
                                    />
                                </div>
                            </div> : null
                    }
                </div>
            </section>
            <section className={styles['section-popular-teachers']}>
                <div className="container">
                    <SectionHeader
                        title="پرطرفدار ترین دوره ها"
                        caption="دوره های محبوب و پروژه محور سبزلرن"
                    />
                    <SwiperWithButtons
                        items={
                        courses.map(course => (
                            <CourseItem
                                category={course.category._id}
                                courseId={course._id}
                                notCol={true}
                                key={course._id}
                                price={course.price}
                                title={course.title}
                                caption={course.shortCaption}
                                students={0}
                                img={course.introductionPoster}
                                offer={20}
                                scores={4.5}
                                teacher={course.creator.username}
                            />
                        ))
                        }
                    />
                </div>
            </section>
            <section className={styles['section-our-services']}>
                <div className="container">
                    <SectionHeader title="مــا چه کمکی میتونیم بهت بکنیم"
                                   caption="از شروع مسیر کنارتیم نمیذاریم آب تو دلت تکون بخوره"/>
                    <div className="flex-space-align0">
                        <OurServiceBox
                            caption="بزار خیالت راحت کنم توی دوره هامون به ریز ترین موارد پرداختیم بعداز دیدن این دوره نیاز به هیچ آموزش دیگه ای نداری."
                            icon={<FaBookOpen style={{fill: "#0A97D4", position: "relative"}}
                                              className={styles['service-icon']}/>}
                            title="تضمین کاملترین محتوا"
                            color="#F0F9FF"
                        />
                        <OurServiceBox
                            caption="هرجا سوالی داشتی به مشکل خوردی بچه های تیم آمادن که مشکلت رو حل کنن تلاشمون اینه بدون نگرانی دوره رو کامل کنی."
                            icon={<FaMessage style={{fill: "#FBBF24", position: "relative"}}
                                             className={styles['service-icon']}/>}
                            title="پشتیبانی دائمی"
                            color="#FEFAEA"
                        />
                    </div>
                    <div className="flex-space-align0">
                        <OurServiceBox
                            caption="کل تمرکز ما رو این هستش بعداز تموم شدن دوره شخص بتونه با اعتماد به نفس کامل پروژه بزنه واقدام کنه برای کسب درآمد."
                            icon={<FaChartSimple style={{fill: "#1EB35B", position: "relative"}}
                                                 className={styles['service-icon']}/>}
                            title="پروژه محور در راستای بازار کار"
                            color="#F0FDF4"
                        />
                        <OurServiceBox
                            caption="به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید."
                            icon={<FaClipboard style={{fill: "#DB2E34", position: "relative"}}
                                               className={styles['service-icon']}/>}
                            title="سراغ حرفه ای ها رفتیم"
                            color="#FEF2F2"
                        />
                    </div>
                </div>
            </section>
            <section className={styles['section-new-teachers']}>
                <div className="container">
                    <SectionHeader title="جدیدتریــن ها" caption="دوره‌های جدید، فرصت‌های نو"/>
                    <SwiperWithButtons
                        items={
                        newCourses.map(course => (
                            <CourseItem
                                category={course.category._id}
                                courseId={course._id}
                                notCol={true}
                                key={course._id}
                                price={course.price}
                                title={course.title}
                                caption={course.shortCaption}
                                students={0}
                                img={course.introductionPoster}
                                offer={20}
                                scores={4.5}
                                teacher={course.creator.username}
                            />
                        ))
                        }
                    />
                </div>
            </section>
            <section className={styles['section-new-articles']}>
                <div className="container">
                    <SectionHeader
                        title="آخـــرین مقالات ما"
                        caption="مقاله های بروز برنامه نویسی و تکنولوژی"
                        link={{text: "همه مقالات", href: "/articles"}}
                    />
                    <div className='flex-space-align0'>
                        {
                            showArticles.map(article => (
                                <ArticleBox
                                    id={article._id}
                                    key={article._id}
                                    title={article.title}
                                    caption="در این مقاله قصد داریم به مقایسه react و vue بپردا"
                                    date="1404/03/22"
                                    image={article.poster}
                                    writer={article.creator.username}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className={styles['section-description']}>
                <div className="container">
                    <Description/>
                </div>
            </section>
            <Footer/>
        </>
    )
}