import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { slugifyHeading } from "@/lib/lesson-content"

type LessonMarkdownProps = {
  readonly content: string
}

export function LessonMarkdown({ content }: LessonMarkdownProps) {
  return (
    <div className="lesson-markdown">
      <ReactMarkdown
        components={{
          a: ({ children, href, ...props }) => {
            const isExternal = href?.startsWith("http")

            return (
              <a
                href={href}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
                {...props}
              >
                {children}
              </a>
            )
          },
          h3: ({ children, ...props }) => {
            const title = String(children)
            const id = slugifyHeading(title)

            return (
              <h3 id={id} {...props}>
                <a aria-label={`${title} 섹션으로 이동`} className="heading-anchor" href={`#${id}`}>
                  #
                </a>
                {children}
              </h3>
            )
          },
          img: ({ alt, src, ...props }) => (
            <figure className="lesson-diagram">
              {/* biome-ignore lint/performance/noImgElement: lesson diagrams are content SVGs with unknown intrinsic dimensions */}
              <img alt={alt ?? ""} src={src ?? ""} {...props} />
              {alt === undefined || alt.length === 0 ? null : <figcaption>{alt}</figcaption>}
            </figure>
          ),
        }}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
