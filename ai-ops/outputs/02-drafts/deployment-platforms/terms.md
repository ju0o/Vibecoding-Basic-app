# 용어 초안: deployment-platforms

기존 glossary.ts 대조: 배포플랫폼/CDN/정적호스팅 미등재 확인 (2026-07-08). 신규 3개.

## Deployment Platform (배포 플랫폼)
category: 배포·운영
shortDefinition: 빌드된 앱을 사용자에게 서빙하는 실행 환경 — build/release/run의 run을 담당
explanation: Firebase Hosting("빠르고 안전한 호스팅 제공")·Vercel 등이 대표적입니다. 정적 모델(빌드 파일을 CDN으로 그대로 서빙)과 서버·함수 모델(요청마다 코드 실행)로 나뉘며, 정적 모델에는 런타임 서버가 없어 서버 코드가 동작하지 않습니다. 배포 전에 "이 플랫폼은 무엇을 실행할 수 있는가"를 아는 것이 AI 배포 구성 검증의 기준입니다.
related: [Build Time, CDN, Static Hosting]

## CDN (Content Delivery Network)
category: 배포·운영
shortDefinition: 파일을 전 세계 엣지에 캐시해 사용자와 가까운 곳에서 서빙하는 전송망
explanation: Firebase Hosting은 "업로드한 각 파일이 전 세계 CDN 엣지의 SSD에 캐시되어 gzip/Brotli로 압축 전송된다"고 설명합니다. 파일이 사용자 가까이 복제되고 작게 압축되므로 지구 어디서든 빠릅니다. 서버가 매번 계산하는 대신 이미 만든 파일을 내보내기에 가능한 속도로, 정적 호스팅이 빠른 근본 이유입니다.
related: [Static Hosting, Deployment Platform, Build Time]

## Static Hosting (정적 호스팅)
category: 배포·운영
shortDefinition: 빌드된 파일(HTML/CSS/JS)을 CDN으로 그대로 서빙하는 배포 모델 — 런타임 서버 없음
explanation: 요청 시 서버가 코드를 실행하지 않고 이미 만들어진 파일을 엣지에서 내보냅니다. 매우 빠르고 저렴하지만 요청마다 달라지는 응답(사용자별 페이지·실시간 데이터)은 만들 수 없습니다. 이 사이트가 Next.js output export를 Firebase Hosting에 올린 정적 호스팅 방식이며, secret을 정적 파일에 담으면 전 세계에 공개되므로 주의해야 합니다.
related: [CDN, Deployment Platform, Runtime]
