import { forwardRef } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type RichTextEditorProps = ReactQuillProps

export type RichTextEditorRef = ReactQuill

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
    (props, ref) => {
        return (
            <div className="rich-text-editor">
                <ReactQuill ref={ref} {...props} />
            </div>
        )
    }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
