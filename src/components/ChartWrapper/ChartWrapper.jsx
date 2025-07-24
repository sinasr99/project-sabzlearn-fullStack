"use client"

import styles from "./ChartWrapper.module.css"

import PersianDate from 'persian-date';

import {FaSortAmountUpAlt, FaCheck} from "react-icons/fa";


import {useEffect, useState} from "react";
import Chart from "@/components/Chart/Chart";
import ChartModal from "@/components/ChartModal/ChartModal";

export default () => {
    // chart data for month
    const [chartDataMonth, setChartDataMonth] = useState(null)
    const [isShowModal, setIsShowModal] = useState(false)

    const [chartData, setChartData] = useState(null);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("week");
    const [filterItems, setFilterItems] = useState([
        {text: "فروش هفته گذشته", value: "week", selected: true},
        {text: "فروش ماه گذشته", value: "month", selected: false},
        {text: "فروش سال گذشته", value: "year", selected: false}
    ])
    const sales = [
        {date: toGlobalDate(1404, 4, 1), course: "دوره Node JS", price: 2_500_000},
        {date: toGlobalDate(1404, 3, 31), course: "دورره React", price: 3_500_000},
        {date: toGlobalDate(1404, 3, 31), course: "دورره React", price: 3_500_000},
        {date: toGlobalDate(1404, 4, 20), course: "دوره Node JS", price: 1_500_000},
        {date: toGlobalDate(1404, 3, 20), course: "دوره Node JS", price: 1_500_000},
        {date: toGlobalDate(1404, 3, 15), course: "دوره Node JS", price: 2_500_000},
        {date: toGlobalDate(1403, 1, 15), course: "دوره Node JS", price: 2_500_000},
        {date: toGlobalDate(1403, 10, 20), course: "دوره Node JS", price: 1_000_000},
        {date: toGlobalDate(1403, 8, 15), course: "دوره Node JS", price: 1_800_000},
        {date: toGlobalDate(1403, 6, 15), course: "دوره Node JS", price: 2_200_000},
        {date: toGlobalDate(1403, 4, 15), course: "دوره Node JS", price: 3_500_000},
        {date: toGlobalDate(1403, 4, 16), course: "دوره Node JS", price: 2_500_000}
    ]

    const changeFilter = index => {
        setFilterItems(prev => {
            return prev.map((item, i) => {
                if (i === index) {
                    setSelectedFilter(item.value)
                    item.selected = true
                    return item
                }
                item.selected = false
                return item
            })
        })
    }


    useEffect(() => {
        const closeMenuEscape = e => {
            if (e.key === "Escape") {
                setIsShowMenu(false)
            }
        }

        const closeMenuClick = () => {
            setIsShowMenu(false)
        }

        window.addEventListener("click", closeMenuClick)
        window.addEventListener("keyup", closeMenuEscape)

        return () => {
            window.removeEventListener("click", closeMenuClick)
            window.removeEventListener("keyup", closeMenuEscape)
            window.removeEventListener("click", changeShowMenu)
        }
    }, [])

    const changeShowMenu = event => {
        event.stopPropagation()
        setIsShowMenu(prev => !prev)
    }

    function persianMonthToNumber(monthName) {
        const months = [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند"
        ];

        const index = months.indexOf(monthName);
        return index !== -1 ? index + 1 : null;
    }

    function toEnglishNumber(str) {
        if (typeof str !== "string") return str;
        return str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    }

    const getWeekdayName = index => {
        const days = ['شنبه*', 'یکشنبه*', 'دوشنبه*', 'سه‌شنبه*', 'چهارشنبه*', 'پنجشنبه*', 'جمعه*']

        return days[index]
    }


    useEffect(() => {
        const arrayDays = getDate(selectedFilter)
        let endDate = null
        let startDate = null
        if (selectedFilter === "week") {
            let arrayDateStart = arrayDays[0].split(" ")
            let arrayDateEnd = arrayDays[arrayDays.length - 1].split(" ")

            arrayDateStart[1] = persianMonthToNumber(arrayDateStart[1])
            arrayDateEnd[1] = persianMonthToNumber(arrayDateEnd[1])

            arrayDateStart = arrayDateStart.map(item => {
                if (typeof item === "string") {
                    return +toEnglishNumber(item)
                }
                return item
            })

            arrayDateEnd = arrayDateEnd.map(item => {
                if (typeof item === "string") {
                    return +toEnglishNumber(item)
                }
                return item
            })

            startDate = new Date(toGlobalDate(arrayDateStart[2], arrayDateStart[1], arrayDateStart[0])).getTime()
            endDate = new Date(toGlobalDate(arrayDateEnd[2], arrayDateEnd[1], arrayDateEnd[0])).getTime()
        }

        switch (selectedFilter) {

            case "week": {
                const itemsResult = sales.filter(item => {
                    return item.date.getTime() >= startDate && item.date.getTime() <= endDate;
                })

                setChartData(
                    arrayDays.map((item, index) => {
                            let price = 0

                            const month = persianMonthToNumber(item.split(" ")[1])
                            const year = +toEnglishNumber(item.split(" ")[2])
                            const day = +toEnglishNumber(item.split(" ")[0])

                            itemsResult.forEach(course => {
                                if (course.date.getTime() === toGlobalDate(year, month, day).getTime()) {
                                    price += course.price
                                }
                            })

                            return {date: (getWeekdayName(index) + item), price}
                        }
                    )
                )

                break
            }
            case "month": {
                setChartData(
                    arrayDays.map(item => {
                        let price = 0

                        const fromYear = +toEnglishNumber(item.day[0].split(" ")[2])
                        const fromMonth = persianMonthToNumber(item.day[0].split(" ")[1])
                        const fromDay = +toEnglishNumber(item.day[0].split(" ")[0])

                        const toYear = +toEnglishNumber(item.day[item.day.length - 1].split(" ")[2])
                        const toMonth = persianMonthToNumber(item.day[item.day.length - 1].split(" ")[1])
                        const toDay = +toEnglishNumber(item.day[item.day.length - 1].split(" ")[0])

                        startDate = toGlobalDate(fromYear, fromMonth, fromDay).getTime()

                        endDate = toGlobalDate(toYear, toMonth, toDay).getTime()

                        sales.forEach(saleItem => {
                            if (saleItem.date.getTime() >= startDate && saleItem.date.getTime() <= endDate) {
                                price += saleItem.price
                            }
                        })
                        return {date: item.text, price}
                    })
                )

                break
            }
            case "year": {
                setChartData(() => {
                    return arrayDays.map(month => {
                        let price = 0

                        const fromDay = +toEnglishNumber(month.weeks[0].day[0].split(" ")[0])
                        const fromMonth = +persianMonthToNumber(month.weeks[0].day[0].split(" ")[1])
                        const fromYear = +toEnglishNumber(month.weeks[0].day[0].split(" ")[2])
                        startDate = toGlobalDate(fromYear, fromMonth, fromDay).getTime()

                        const toDay = +toEnglishNumber((month.weeks[month.weeks.length - 1].day[month.weeks[month.weeks.length - 1].day.length - 1]).split(" ")[0])
                        const toMonth = +persianMonthToNumber((month.weeks[month.weeks.length - 1].day[month.weeks[month.weeks.length - 1].day.length - 1]).split(" ")[1])
                        const toYear = +toEnglishNumber((month.weeks[month.weeks.length - 1].day[month.weeks[month.weeks.length - 1].day.length - 1]).split(" ")[2])
                        endDate = toGlobalDate(toYear, toMonth, toDay).getTime()

                        sales.forEach(saleItem => {
                            const dateNumber = saleItem.date.getTime()
                            if (dateNumber >= startDate && dateNumber <= endDate) {
                                price += saleItem.price
                            }
                        })

                        return {date: month.month, price}
                    })
                })
                break
            }
        }
    }, [selectedFilter])

    const getPersianOrdinal = (number) => {
        switch (number) {
            case 1:
                return "اول";
            case 2:
                return "دوم";
            case 3:
                return "سوم";
            case 4:
                return "چهارم";
            case 5:
                return "پنجم";
            case 6:
                return "ششم";
            case 7:
                return "هفتم";
            case 8:
                return "هشتم";
            case 9:
                return "نهم";
            case 10:
                return "دهم";
            default:
                return number + "م";
        }
    }

    const getDate = (filter) => {
        switch (filter) {
            case "week": {
                const today = new PersianDate();
                const dayOfWeek = today.day(); // شنبه=1 ... جمعه=7

                // شنبه هفته جاری
                const startOfCurrentWeek = today.clone().subtract('days', dayOfWeek - 1);

                // شنبه هفته گذشته
                const startOfLastWeek = startOfCurrentWeek.clone().subtract('days', 7);

                const dates = [];
                for (let i = 0; i < 7; i++) {
                    const day = startOfLastWeek.clone().add('days', i);
                    dates.push(day.format('D MMMM YYYY'));
                }

                return dates;
            }

            case "month": {
                const today = new PersianDate();

                const lastMonthDate = today.clone().subtract('months', 1);
                const daysInLastMonth = lastMonthDate.daysInMonth();

                const firstDayOfLastMonth = lastMonthDate.clone().date(1);
                const firstDayOfWeek = firstDayOfLastMonth.day(); // شنبه=1 ... جمعه=7

                const weeks = [];
                let currentDay = 1;
                let weekNumber = 1;

                const endOfFirstWeek = 8 - firstDayOfWeek;
                const firstWeekEnd = Math.min(endOfFirstWeek, daysInLastMonth);

                // هفته اول
                const firstWeekDays = [];
                for (let i = currentDay; i <= firstWeekEnd; i++) {
                    firstWeekDays.push(lastMonthDate.clone().date(i).format('D MMMM YYYY'));
                }
                weeks.push({
                    text: `هفته ${getPersianOrdinal(weekNumber)}`,
                    value: `week${weekNumber}`,
                    day: firstWeekDays
                });

                currentDay = firstWeekEnd + 1;
                weekNumber++;

                // بقیه هفته‌ها
                while (currentDay <= daysInLastMonth) {
                    const weekDays = [];
                    const endDayNumber = Math.min(currentDay + 6, daysInLastMonth);

                    for (let i = currentDay; i <= endDayNumber; i++) {
                        weekDays.push(lastMonthDate.clone().date(i).format('D MMMM YYYY'));
                    }

                    weeks.push({
                        text: `هفته ${getPersianOrdinal(weekNumber)}`,
                        value: `week${weekNumber}`,
                        day: weekDays
                    });

                    currentDay = endDayNumber + 1;
                    weekNumber++;
                }

                return weeks;
            }

            case "year": {
                const today = new PersianDate();

                // سال گذشته
                const lastYearDate = today.clone().subtract('years', 1);
                const year = lastYearDate.year();

                const months = [];

                // لیست ماه‌های فارسی
                const monthNames = [
                    "فروردین", "اردیبهشت", "خرداد",
                    "تیر", "مرداد", "شهریور",
                    "مهر", "آبان", "آذر",
                    "دی", "بهمن", "اسفند"
                ];

                for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {

                    const monthStart = new PersianDate([year, monthIndex, 1]);
                    const daysInMonth = monthStart.daysInMonth();

                    const firstDayOfWeek = monthStart.day(); // شنبه=1 ... جمعه=7

                    const weeks = [];
                    let currentDay = 1;
                    let weekNumber = 1;

                    const endOfFirstWeek = 8 - firstDayOfWeek;
                    const firstWeekEnd = Math.min(endOfFirstWeek, daysInMonth);

                    // هفته اول
                    const firstWeekDays = [];
                    for (let i = currentDay; i <= firstWeekEnd; i++) {
                        firstWeekDays.push(monthStart.clone().date(i).format('D MMMM YYYY'));
                    }
                    weeks.push({
                        text: `هفته ${getPersianOrdinal(weekNumber)}`,
                        value: `week${weekNumber}`,
                        day: firstWeekDays
                    });

                    currentDay = firstWeekEnd + 1;
                    weekNumber++;

                    // بقیه هفته‌ها
                    while (currentDay <= daysInMonth) {
                        const weekDays = [];
                        const endDayNumber = Math.min(currentDay + 6, daysInMonth);

                        for (let i = currentDay; i <= endDayNumber; i++) {
                            weekDays.push(monthStart.clone().date(i).format('D MMMM YYYY'));
                        }

                        weeks.push({
                            text: `هفته ${getPersianOrdinal(weekNumber)}`,
                            value: `week${weekNumber}`,
                            day: weekDays
                        });

                        currentDay = endDayNumber + 1;
                        weekNumber++;
                    }

                    months.push({
                        month: monthNames[monthIndex - 1],
                        weeks
                    });
                }

                return months;
            }

        }
    }

    function toGlobalDate(y, m, d) {
        const pd = new PersianDate([y, m, d])
        return pd.toDate()
    }

    function toPersianDate(date) {
        const pd = new PersianDate(date)
        return pd.format("D MMMM YYYY'").slice(0, -1)
    }

    const clickX = (value, index) => {
        const arrayDate = getDate(selectedFilter)
        let startDay = null
        let endDay = null

        if (selectedFilter === "year") {
            const currentWeeks = arrayDate[index].weeks
            let totalPrice = 0
            setChartDataMonth(
                currentWeeks.map(week => {
                    let price = 0

                    const fD = +toEnglishNumber(week.day[0].split(" ")[0])
                    const fM = +persianMonthToNumber(week.day[0].split(" ")[1])
                    const fY = +toEnglishNumber(week.day[0].split(" ")[2])
                    startDay = toGlobalDate(fY, fM, fD).getTime()

                    const toD = +toEnglishNumber(week.day[week.day.length - 1].split(" ")[0])
                    const toM = +persianMonthToNumber(week.day[week.day.length - 1].split(" ")[1])
                    const toY = +toEnglishNumber(week.day[week.day.length - 1].split(" ")[2])
                    endDay = toGlobalDate(toY, toM, toD).getTime()

                    sales.forEach(sale => {
                        const numberDate = sale.date.getTime()
                        if (numberDate >= startDay && numberDate <= endDay) {
                            price += sale.price
                        }
                    })
                    totalPrice += price
                    return {date: week.text, price}
                })
            )
            if(totalPrice) {
                setIsShowModal(true)
            }
        }
    }

    const getSpaceX = (index, value) => {
        if (index === 6 && value === "جمعه") {
            return -20
        } else if (value === "هفته ششم") {
            return -32
        } else if (value === "اسفند") {
            return -20
        } else {
            return 0
        }
    }

    const getTextTitle = () => {
        switch (selectedFilter) {
            case "week": {
                return "نمودار میزان فروش هفته گذشته"
            }
            case "month": {
                return "نمودار میزان فروش ماه گذشته"
            }
            case "year": {
                return "نمودار میزان فروش سال گذشته"
            }
        }
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <h4 className={styles['title']}>{getTextTitle()}</h4>
                <div className={styles['filter-chart-wrapper']}>
                    <div
                        onClick={e => changeShowMenu(e)}
                        className={styles['filter-chart-header']}>
                        <FaSortAmountUpAlt className={styles['sort-icon']}/>
                    </div>
                    <div
                        style={isShowMenu ? {zIndex: "10", opacity: "1", top: "100%"} : {
                            zIndex: "-1",
                            opacity: "0",
                            top: "0"
                        }}
                        className={styles['filter-chart-items']}>
                        {
                            filterItems.map((item, i) => (
                                <p
                                    onClick={() => changeFilter(i)}
                                    key={i} className={
                                    item.selected ? `${styles['filter-chart-item']} ${styles['item-active']}` : `${styles['filter-chart-item']}`
                                }>
                                    {item.text}
                                    {
                                        item.selected ? <FaCheck className={styles['check']}/> : null
                                    }
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles['chart-wrapper']}>
                    {
                        chartData ? <Chart data={chartData} clickX={clickX} getSpaceX={getSpaceX}/>
                            : <p className={styles['alert-empty']}>هیج فروشی در این بازه زمانی وجود ندارد</p>
                    }
            </div>
            {
                (isShowModal) ? <ChartModal
                    clickX={clickX}
                    getSpaceX={getSpaceX}
                    data={chartDataMonth}
                    setIsShowModal={setIsShowModal}
                    title={getTextTitle()}
                /> : null
            }
        </div>
    )
}