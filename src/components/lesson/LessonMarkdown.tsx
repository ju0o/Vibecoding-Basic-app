import ReactMarkdown from "react-markdown"

type LessonMarkdownProps = {
  readonly content: string
}

export function LessonMarkdown({ content }: LessonMarkdownProps) {
  return (
    <div className="lesson-markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
