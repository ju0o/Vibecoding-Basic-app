param(
    [string]$LessonDir = "src/content/lessons/markdown",
    [string]$ReportPath = "ai-ops/reports/cline-audit/lesson-format-scan.md"
)

$files = Get-ChildItem -Path $LessonDir -Filter "*.md" | Sort-Object Name

$v2Sections = @(
    "한 줄 정의",
    "왜 존재하는가",
    "작동 원리",
    "스펙과 세부",
    "원문으로 읽기",
    "실전에서",
    "한계와 트레이드오프",
    "더 읽기"
)

$v1Patterns = @(
    "오늘 배울 것",
    "학습 목표",
    "들어가며",
    "개요",
    "정리하기",
    "마치며",
    "핵심 요약",
    "학습 내용"
)

$rows = @()
$violations = @{
    "V2 8섹션 미준수" = [System.Collections.ArrayList]@()
    "글자수 8,000자 미만" = [System.Collections.ArrayList]@()
    "인용 블록 3개 미만" = [System.Collections.ArrayList]@()
    "== 하이라이트 불균형" = [System.Collections.ArrayList]@()
    "콜아웃 8개 초과" = [System.Collections.ArrayList]@()
    "V1 형식 잔존" = [System.Collections.ArrayList]@()
}

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $name = $file.Name
    
    # V2 8섹션 존재 여부
    $presentSections = @()
    foreach ($sec in $v2Sections) {
        if ($content -match "^## $sec" -or $content -match "^## $sec`$") {
            $presentSections += $sec
        }
    }
    $sectionStatus = if ($presentSections.Count -ge 8) { "완료" } else { "미비: " + (($v2Sections | Where-Object { $_ -notin $presentSections }) -join ", ") }
    if ($presentSections.Count -lt 8) { [void]$violations["V2 8섹션 미준수"].Add($name) }
    
    # 글자 수 (코드 블록/HTML 제거)
    $textOnly = $content -replace '```[\s\S]*?```', '' -replace '---[\s\S]*?---', ''
    $charCount = $textOnly.Length
    $charStatus = if ($charCount -lt 8000) { "$charCount 자 (8,000자 미만)" } else { "$charCount 자" }
    if ($charCount -lt 8000) { [void]$violations["글자수 8,000자 미만"].Add($name) }
    
    # 인용 블록 수 (^> " 형식)
    $quoteCount = ([regex]::Matches($content, "(?m)^\> `"").Count)
    $quoteStatus = if ($quoteCount -lt 3) { "$quoteCount 개 (3개 미만)" } else { "$quoteCount 개" }
    if ($quoteCount -lt 3) { [void]$violations["인용 블록 3개 미만"].Add($name) }
    
    # == 하이라이트 짝수 여부
    $highlightMatches = [regex]::Matches($content, "==")
    $highlightIsEven = ($highlightMatches.Count % 2 -eq 0)
    $highlightStatus = if ($highlightIsEven) { "$($highlightMatches.Count)개 짝수" } else { "$($highlightMatches.Count)개 홀수(불일치)" }
    if (-not $highlightIsEven) { [void]$violations["== 하이라이트 불균형"].Add($name) }
    
    # 섹션별 == 3쌍(6개) 초과 확인
    $sectionBlocks = $content -split '(?=^## )'
    $highlightExceed = $false
    foreach ($sb in $sectionBlocks) {
        $sbTrimmed = $sb.Trim()
        if ($sbTrimmed.Length -eq 0) { continue }
        $secHighlights = [regex]::Matches($sbTrimmed, "==").Count
        if ($secHighlights -gt 6) { $highlightExceed = $true; break }
    }
    if ($highlightExceed) {
        if ($highlightStatus -notmatch "불일치") { $highlightStatus += " (섹션당 3쌍 초과 있음)" }
        if ($name -notin $violations["== 하이라이트 불균형"]) { [void]$violations["== 하이라이트 불균형"].Add($name) }
    }
    
    # 콜아웃 (> [!...)
    $calloutCount = ([regex]::Matches($content, ">\s*\[!").Count)
    $calloutStatus = if ($calloutCount -gt 8) { "$calloutCount 개 (8개 초과)" } else { "$calloutCount 개" }
    if ($calloutCount -gt 8) { [void]$violations["콜아웃 8개 초과"].Add($name) }
    
    # V1 형식 잔존
    $foundV1 = @()
    foreach ($vp in $v1Patterns) {
        if ($content -match "^##\s*$vp") {
            $foundV1 += $vp
        }
    }
    $v1Status = if ($foundV1.Count -gt 0) { "발견: " + ($foundV1 -join ', ') } else { "없음" }
    if ($foundV1.Count -gt 0) { [void]$violations["V1 형식 잔존"].Add($name) }
    
    $rows += [PSCustomObject]@{
        File = $name
        V2Sections = $sectionStatus
        CharCount = $charStatus
        Quotes = $quoteStatus
        Highlight = $highlightStatus
        Callout = $calloutStatus
        V1 = $v1Status
    }
}

# Generate report
$reportLines = @"
# 강의 형식 전수 스캔 보고서 (JOB 1)

**생성일시**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**대상**: src/content/lessons/markdown/*.md ($($files.Count)개 파일)

---

## 스캔 결과 표

| 강의 파일 | V2 8섹션 | 글자수 | 인용블록(> ") | == 하이라이트 | 콜아웃(> [!]) | V1 잔존 |
|-----------|----------|--------|--------------|---------------|--------------|---------|
"@

foreach ($r in $rows) {
    $reportLines += "`n| $($r.File) | $($r.V2Sections) | $($r.CharCount) | $($r.Quotes) | $($r.Highlight) | $($r.Callout) | $($r.V1) |"
}

$reportLines += @"

---

## 위반 요약 표

| 위반 유형 | 대상 수 | 위반 강의 |
|-----------|---------|-----------|
"@

$violationOrder = @("V2 8섹션 미준수", "글자수 8,000자 미만", "인용 블록 3개 미만", "== 하이라이트 불균형", "콜아웃 8개 초과", "V1 형식 잔존")
$totalViolations = 0
foreach ($vtype in $violationOrder) {
    $vlist = $violations[$vtype]
    $count = $vlist.Count
    $totalViolations += $count
    $names = if ($count -gt 0) { $vlist -join ", " } else { "-" }
    $reportLines += "`n| $vtype | $count | $names |"
}

$reportLines += @"

---

## 통계

- **전체 강의 수**: $($files.Count)
- **위반/이상 건수(중복 포함)**: $totalViolations

| 위반 유형 | 건수 |
|-----------|------|
"@

foreach ($vtype in $violationOrder) {
    $reportLines += "`n| $vtype | $($violations[$vtype].Count) |"
}

$reportLines += "`n"
$reportLines | Out-File -FilePath $ReportPath -Encoding utf8
Write-Host "Report saved to $ReportPath"