"use client"

import {Checkbox, Switch} from "@mui/material"

import styles from "./CourseFilter.module.css"
import {useState} from "react";
import {TiArrowSortedDown, TiArrowSortedUp} from "react-icons/ti"
import {GoFileDirectoryFill} from "react-icons/go";
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import {IoSearch} from "react-icons/io5";

export default ({
                    filterBackend,
                    filterFront,
                    filterBought,
                    filterFree,
                    value,
                    setValue,
                    searchText,
                    onlySearch,
                    search
                }) => {

    const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);

    return (
        <>
            {
                searchText ? <div className={styles['search-wrapper']}>
                    <input value={value} onChange={e => setValue(e.target.value)} className={styles['search-input']}
                           type="text" placeholder={searchText}/>
                    <IoSearch onClick={search} className={styles['search-icon']}/>
                </div> : null
            }
            {
                onlySearch ? null :
                    <>
                        <div className={styles['filter-item']}>
                            فقط دوره های رایگان
                            <Switch
                                checked={filterFree[0]}
                                onChange={e => filterFree[1](e.target.checked)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#1EB35B',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#1EB35B',
                                    }
                                }}
                            />
                        </div>
                        <div className={styles['filter-item']}>
                            دوره ها خریداری شده
                            <Switch
                                checked={filterBought[0]}
                                onChange={e => filterBought[1](e.target.checked)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#1EB35B',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#1EB35B',
                                    }
                                }}
                            />
                        </div>

                        <div
                            style={isCategoryFilterOpen ? {height: "fit-content"} : {}}
                            className={styles['category-filter-wrapper']}>
                            <div
                                onClick={() => setIsCategoryFilterOpen(prev => !prev)}
                                className={styles['category-filter-header']}>
                                <p className={styles['category-filter-title']}>
                                    <GoFileDirectoryFill className={styles['icon-course']}/>
                                    دسته بندی دوره ها
                                </p>
                                {
                                    isCategoryFilterOpen ?
                                        <TiArrowSortedUp onClick={() => setIsCategoryFilterOpen(prev => !prev)}
                                                         className={styles['icon']}/> :
                                        <TiArrowSortedDown onClick={() => setIsCategoryFilterOpen(prev => !prev)}
                                                           className={styles['icon']}/>
                                }
                            </div>
                            <p className={styles['category-item']}>
                                <Checkbox
                                    icon={<CropSquareRoundedIcon fontSize="medium" sx={{color: "#1EB35B"}}/>}
                                    checkedIcon={<SquareRoundedIcon fontSize="medium" sx={{color: "#1EB35B"}}/>}
                                    checked={filterFront[0]}
                                    onChange={e => filterFront[1](e.target.checked)}
                                />
                                فرانت اند
                            </p>
                            <p className={styles['category-item']}>
                                <Checkbox
                                    icon={<CropSquareRoundedIcon fontSize="medium" sx={{color: "#1EB35B"}}/>}
                                    checkedIcon={<SquareRoundedIcon fontSize="medium" sx={{color: "#1EB35B"}}/>}
                                    checked={filterBackend[0]}
                                    onChange={e => filterBackend[1](e.target.checked)}
                                />
                                بک اند
                            </p>
                        </div>
                    </>
            }
        </>
    )
}