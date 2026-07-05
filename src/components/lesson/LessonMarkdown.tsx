import { Children, isValidElement, type ReactElement, type ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { slugifyHeading } from "@/lib/lesson-content"

type LessonMarkdownProps = {
  readonly content: string
}

const CALLOUTS = {
  EXAMPLE: {
    className: "lesson-callout-example",
    icon: "Example",
    label: "예시",
  },
  KEY: {
    className: "lesson-callout-key",
    icon: "Key",
    label: "핵심",
  },
  WARNING: {
    className: "lesson-callout-warning",
    icon: "Warning",
    label: "주의",
  },
  TIP: {
    className: "lesson-callout-tip",
    icon: "Tip",
    label: "팁",
  },
} as const

type CalloutType = keyof typeof CALLOUTS

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
          blockquote: ({ children, ...props }) => {
            const calloutType = findCalloutType(children)

            if (calloutType === undefined) {
              return <blockquote {...props}>{children}</blockquote>
            }

            const callout = CALLOUTS[calloutType]

            return (
              <aside
                aria-label={`${callout.label} 콜아웃`}
                className={`lesson-callout ${callout.className}`}
              >
                <div className="lesson-callout-label">
                  <span className="lesson-callout-icon" aria-hidden="true">
                    {callout.icon}
                  </span>
                  {callout.label}
                </div>
                <div className="lesson-callout-body">{removeCalloutMarker(children)}</div>
              </aside>
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

function findCalloutType(node: ReactNode): CalloutType | undefined {
  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) {
      continue
    }

    const props = getElementProps(child)
    const marker = props["data-callout"]

    if (isCalloutType(marker)) {
      return marker
    }

    const nested = findCalloutType(props["children"] as ReactNode)

    if (nested !== undefined) {
      return nested
    }
  }

  return undefined
}

function removeCalloutMarker(children: ReactNode): ReactNode[] {
  return Children.toArray(children).filter((child) => !isMarkerOnlyParagraph(child))
}

function isMarkerOnlyParagraph(node: ReactNode): boolean {
  if (!isValidElement(node) || node.type !== "p") {
    return false
  }

  const props = getElementProps(node)
  const meaningfulChildren = Children.toArray(props["children"] as ReactNode).filter((child) => {
    return !(typeof child === "string" && child.trim().length === 0)
  })

  return meaningfulChildren.length > 0 && meaningfulChildren.every(isCalloutMarker)
}

function isCalloutMarker(node: ReactNode): boolean {
  if (!isValidElement(node) || node.type !== "span") {
    return false
  }

  return isCalloutType(getElementProps(node)["data-callout"])
}

function isCalloutType(value: unknown): value is CalloutType {
  return (
    typeof value === "string" &&
    (Object.keys(CALLOUTS) as CalloutType[]).includes(value as CalloutType)
  )
}

function getElementProps(element: ReactElement): Record<string, unknown> {
  return element.props as Record<string, unknown>
}
