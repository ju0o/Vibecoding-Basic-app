"use client"

import { useEffect, useState } from "react"
import { type Category, listActiveCategories } from "@/lib/community/categories"

export default function CategorySelect({
  kind,
  value,
  onChange,
}: {
  kind: Category["kind"]
  value: string
  onChange: (value: string) => void
}) {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    void listActiveCategories(kind)
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [kind])
  return (
    <select
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-[var(--text-primary)]"
    >
      <option value="">카테고리를 선택하세요</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.label}
        </option>
      ))}
    </select>
  )
}
