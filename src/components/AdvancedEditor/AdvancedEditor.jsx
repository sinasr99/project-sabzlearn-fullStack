"use client"

import styles from "./AdvancedEditor.module.css"

import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import {Color} from '@tiptap/extension-color'
import TextAlign from "@tiptap/extension-text-align"
import Underline from '@tiptap/extension-underline'
import {useEditor, EditorContent} from '@tiptap/react'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import FontSize from "@/extentions/FontSize";
import {useEffect, useState} from "react";
import {FaBold, FaImage, FaItalic, FaLink, FaUnderline} from "react-icons/fa";
import {FaAlignLeft, FaAlignCenter, FaAlignJustify, FaAlignRight} from "react-icons/fa6";


export default ({value, setValue}) => {

    const [link, setLink] = useState("")

    const [textAlign, setTextAlign] = useState("right")

    const [isBoldActive, setIsBoldActive] = useState(false)
    const [isItalicActive, setIsItalicActive] = useState(false)
    const [isUnderlineActive, setIsUnderlineActive] = useState(false)

    const [isShowSizes, setIsShowSizes] = useState(false)
    const [isShowWeights, setIsShowWeights] = useState(false)
    const [isShowColors, setIsShowColors] = useState(false)

    const [inputSize, setInputSize] = useState("8")
    const [currentColor, setCurrentColor] = useState('#000')
    const [currentFontWeight, setCurrentFontWeight] = useState("P")
    const [colors, setColors] = useState(["#fff", "#000", "#1EB35BFF", "#097E8EFF", "#09268EFF", "#45098EFF", "#B81616FF", "#DAD008FF", "#D97829FF"])
    const [fontWeightItems, setWeightItems] = useState(["H1", "H2", "H3", "H4", "H5", "H6", "P"]);
    const [sizes, setSizes] = useState([8, 10, 12, 14, 16, 18, 22, 26, 30, 36, 44, 50, 60, 70])
    const [sizeInput, setSizeInput] = useState(8)

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            Link,
            StarterKit,
            TextStyle,
            Underline,
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
            FontSize,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'right', 'center', 'justify'],
                defaultAlignment: 'right',
            }),
        ],
        content: value || "<p></p>",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setValue(html)
        },
    })

    useEffect(() => {
        if (!editor) return
        if (value !== editor.getHTML()) {
            editor.commands.setContent(value, false)
        }
    }, [value, editor])


    useEffect(() => {
        if (!editor) return
        editor.chain().focus().setColor(currentColor).run()
    }, [currentColor]);

    useEffect(() => {
        if (!editor) return

        switch (textAlign) {
            case "left": {
                editor.chain().focus().setTextAlign('left').run()
                break
            }
            case "right": {
                editor.chain().focus().setTextAlign('right').run()
                break
            }
            case "center": {
                editor.chain().focus().setTextAlign('center').run()
                break
            }
            case "justify": {
                editor.chain().focus().setTextAlign('justify').run()
                break
            }
            default: {
                editor.chain().focus().setTextAlign('left').run()
            }
        }
    }, [editor, textAlign])


    useEffect(() => {
        if (!editor) return;

        const updateActiveStates = () => {
            setIsBoldActive(editor.isActive('bold'));
            setIsItalicActive(editor.isActive('italic'));
            setIsUnderlineActive(editor.isActive('underline'));

            if (editor.isActive('paragraph')) {
                setCurrentFontWeight('P');
            } else if (editor.isActive('heading', {level: 1})) {
                setCurrentFontWeight('H1');
            } else if (editor.isActive('heading', {level: 2})) {
                setCurrentFontWeight('H2');
            } else if (editor.isActive('heading', {level: 3})) {
                setCurrentFontWeight('H3');
            } else if (editor.isActive('heading', {level: 4})) {
                setCurrentFontWeight('H4');
            } else if (editor.isActive('heading', {level: 5})) {
                setCurrentFontWeight('H5');
            } else if (editor.isActive('heading', {level: 6})) {
                setCurrentFontWeight('H6');
            } else {
                setCurrentFontWeight('P');
            }
        };

        editor.on('selectionUpdate', updateActiveStates);
        editor.on('transaction', updateActiveStates);

        // اجرای اولیه
        updateActiveStates();

        return () => {
            editor.off('selectionUpdate', updateActiveStates);
            editor.off('transaction', updateActiveStates);
        };
    }, [editor]);

    useEffect(() => {
        if (!editor) return;

        let fontSize;
        switch (currentFontWeight) {
            case "P":
                editor.chain().focus().setParagraph().run();
                fontSize = 14; // یا هر سایز پیش‌فرض پاراگراف که خودت دوست داری
                break;
            case "H1":
                editor.chain().focus().setHeading({level: 1}).run();
                fontSize = 36;
                break;
            case "H2":
                editor.chain().focus().setHeading({level: 2}).run();
                fontSize = 30;
                break;
            case "H3":
                editor.chain().focus().setHeading({level: 3}).run();
                fontSize = 26;
                break;
            case "H4":
                editor.chain().focus().setHeading({level: 4}).run();
                fontSize = 22;
                break;
            case "H5":
                editor.chain().focus().setHeading({level: 5}).run();
                fontSize = 18;
                break;
            case "H6":
                editor.chain().focus().setHeading({level: 6}).run();
                fontSize = 16;
                break;
            default:
                editor.chain().focus().setParagraph().run();
                fontSize = 14;
                break;
        }

        // تنظیم فونت سایز روی متن (با mark textStyle)
        if (fontSize) {
            editor.chain().focus().setMark('textStyle', {fontSize: fontSize}).run();
            setSize(fontSize)
        }

    }, [currentFontWeight, editor]);

    const setSize = newSize => {
        if (!isNaN(newSize)) {
            editor?.chain().focus().setMark('textStyle', {fontSize: newSize}).run()
            setInputSize(newSize)
            setSizeInput(newSize)
        }
    }

    useEffect(() => {
        const close = () => {
            setIsShowSizes(false)
            setIsShowWeights(false)
            setIsShowColors(false)
        }

        window.addEventListener("click", close)

        return () => {
            window.removeEventListener("click", close)
        }
    }, []);

    const changeStatus = (event, set) => {
        event.stopPropagation()
        set(prev => !prev)
    }

    const changeInputSize = newValue => {
        if (!isNaN(newValue)) {
            setInputSize(newValue)
        }
    }

    const enterSize = event => {
        if (event.key === "Enter") {
            setIsShowSizes(false)
            setSize(+inputSize)
        }
    }

    const toggleBold = () => {
        editor?.chain().focus().toggleBold().run()
    }

    const toggleItalic = () => {
        editor?.chain().focus().toggleItalic().run()
    }

    const toggleUnderline = () => {
        editor?.chain().focus().toggleUnderline().run()
    }

    const getImage = () => {
        const url = prompt("آدرس عکس را وارد کنید")
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const createLink = () => {
        if (link.trim()) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: link })
                .run()
            setLink("")
        }
    }

    return (
        <div className={styles['editor-wrapper']}>
            <div className={styles['buttons']}>
                <div className={styles['size-wrapper']}>
                    <input
                        onClick={event => changeStatus(event, setIsShowSizes)}
                        className={styles['size-input']} type="text" value={inputSize}
                        onChange={e => changeInputSize(e.target.value)}
                        onKeyUp={event => enterSize(event)}
                    />
                    <div
                        style={isShowSizes ? {top: "100%", opacity: "1", zIndex: "1"} : {
                            top: "0",
                            opacity: "0",
                            zIndex: "-1"
                        }}
                        className={styles['size-items']}>
                        {
                            sizes.map((size, i) => (
                                <p
                                    onClick={e => setSize(e.target.innerText)}
                                    key={i} className={styles['size-item']}>{size}</p>
                            ))
                        }
                    </div>
                </div>
                <div className={styles['font-type-wrapper']}>
                    <FaBold
                        style={isBoldActive ? {color: "black"} : {}}
                        onClick={toggleBold}
                        className={styles['bold-icon']}/>
                    <FaItalic
                        style={isItalicActive ? {color: "black"} : {}}
                        onClick={toggleItalic}
                        className={styles['italic-icon']}/>
                    <FaUnderline
                        style={isUnderlineActive ? {color: "black"} : {}}
                        onClick={toggleUnderline}
                        className={styles['underline-icon']}/>
                </div>
                <div className={styles['font-wight-wrapper']}>
                    <p
                        onClick={e => changeStatus(e, setIsShowWeights)}
                        className={styles['current-font-weight']}>{currentFontWeight}</p>
                    <div
                        style={isShowWeights ? {top: "100%", opacity: "1", zIndex: "1"} : {
                            top: "0",
                            opacity: "0",
                            zIndex: "-1"
                        }}
                        className={styles['font-weight-items']}>
                        {
                            fontWeightItems.map((item, i) => (
                                <p
                                    onClick={e => setCurrentFontWeight(e.target.innerHTML)}
                                    key={i}
                                    className={currentFontWeight === item ? `${styles['font-weight-item']} ${styles['active']}` : `${styles['font-weight-item']}`}>{item}</p>
                            ))
                        }
                    </div>
                </div>
                <div className={styles['alignment-wrapper']}>
                    <FaAlignRight
                        onClick={() => setTextAlign("right")}
                        className={editor?.isActive({textAlign: 'right'}) ? `${styles['alignment-icon']} ${styles['active']}` : `${styles['alignment-icon']}`}
                    />
                    <FaAlignCenter
                        onClick={() => setTextAlign("center")}
                        className={editor?.isActive({textAlign: 'center'}) ? `${styles['alignment-icon']} ${styles['active']}` : `${styles['alignment-icon']}`}
                    />
                    <FaAlignLeft
                        onClick={() => setTextAlign("left")}
                        className={editor?.isActive({textAlign: 'left'}) ? `${styles['alignment-icon']} ${styles['active']}` : `${styles['alignment-icon']}`}
                    />
                    <FaAlignJustify
                        onClick={() => setTextAlign("justify")}
                        className={editor?.isActive({textAlign: 'justify'}) ? `${styles['alignment-icon']} ${styles['active']}` : `${styles['alignment-icon']}`}
                    />

                </div>
                <div className={styles['colors']}>
                    <div
                        onClick={e => changeStatus(e, setIsShowColors)}
                        style={{backgroundColor: currentColor}}
                        className={styles['current-color']}></div>
                    <div
                        style={isShowColors ? {top: "100%", opacity: "1", zIndex: "1"} : {
                            top: "0",
                            opacity: "0",
                            zIndex: "-1"
                        }}
                        className={styles['colors-items']}>
                        {
                            colors.map((item, i) => (
                                <div
                                    onClick={() => setCurrentColor(item)}
                                    key={i} style={{backgroundColor: item}} className={styles['color-item']}></div>
                            ))
                        }
                    </div>

                </div>
                <FaImage
                    onClick={getImage}
                    className={styles['img-icon']}/>
                <div className={styles['link-wrapper']}>
                    <input value={link} onChange={e => setLink(e.target.value)} type="text" placeholder="ادرس url را وارد کنید" className={styles['link-input']}/>
                    <button onClick={createLink} className={styles['link-btn']}>
                        <FaLink className={styles['link-icon']}/>
                    </button>
                </div>
            </div>
            <div className={styles['editor']}>
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}