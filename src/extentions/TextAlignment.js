import { Extension } from '@tiptap/core'

const types = ['paragraph', 'heading']

const TextAlign = Extension.create({
    name: 'textAlign',

    addOptions() {
        return {
            types,
        }
    },

    addAttributes() {
        return {
            textAlign: {
                default: 'left',
                parseHTML: element => {
                    // اول نگاه کنیم style داره یا attribute align
                    const textAlign = element.style.textAlign || element.getAttribute('align')
                    return textAlign || 'left'
                },
                renderHTML: attributes => {
                    if (!attributes.textAlign || attributes.textAlign === 'left') {
                        return {}
                    }
                    return {
                        style: `text-align: ${attributes.textAlign}`,
                        align: attributes.textAlign,
                    }
                },
            },
        }
    },

    extendNodeSchema(name, schema) {
        if (!types.includes(name)) {
            return schema
        }
        return {
            ...schema,
            attrs: {
                ...schema.attrs,
                textAlign: {
                    default: 'left',
                    parseHTML: element => {
                        const textAlign = element.style.textAlign || element.getAttribute('align')
                        return textAlign || 'left'
                    },
                    renderHTML: attributes => {
                        if (!attributes.textAlign || attributes.textAlign === 'left') {
                            return {}
                        }
                        return {
                            style: `text-align: ${attributes.textAlign}`,
                            align: attributes.textAlign,
                        }
                    },
                },
            },
        }
    },

    addCommands() {
        return {
            setTextAlign:
                align =>
                    ({ state, dispatch }) => {
                        const { selection, doc } = state
                        const { from, to } = selection
                        const tr = state.tr
                        let changed = false

                        doc.nodesBetween(from, to, (node, pos) => {
                            if (types.includes(node.type.name)) {
                                tr.setNodeMarkup(pos, undefined, {
                                    ...node.attrs,
                                    textAlign: align,
                                })
                                changed = true
                            }
                        })

                        if (changed) {
                            dispatch(tr)
                            return true
                        }

                        return false
                    },
        }
    },
})

export default TextAlign
