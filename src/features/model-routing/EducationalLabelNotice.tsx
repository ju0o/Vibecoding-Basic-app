import { EDUCATIONAL_LABEL_NOTICE } from "@/lib/model-routing/contract"

export function EducationalLabelNotice() {
  return (
    <p
      className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]"
      role="note"
    >
      {EDUCATIONAL_LABEL_NOTICE} 이 화면은{" "}
      <strong className="font-semibold text-[var(--text-primary)]">교육용 시뮬레이션</strong>
      이며 실제 모델 API를 호출하지 않습니다.
    </p>
  )
}
