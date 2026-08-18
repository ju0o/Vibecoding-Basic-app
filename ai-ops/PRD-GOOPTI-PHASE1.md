# PRD ? 구피티 (GooPiTi) Community Foundation 
  
## Product Identity  
- 이름: 구피티 (GooPiTi)  
- 정체성: AI & 바이브코딩 커뮤니티  
- 슬로건: 코드로 연결되고, 인사이트로 성장하는 우리 
  
## Product Direction  
- 커뮤니티 중심 (B)  
- V2만 완성, V1 중단/아카이브 (D)  
- Community부터 우선 구현 (B)  
- 점진적 정리 (C) 
  
## Phase 1 Scope (MVP)  
  
### 포함  
- Firebase Auth (Google, GitHub)  
- 회원 승인제 (admin만 승인)  
- 역할: guest | pending_member | member | admin  
- 자유게시판 (제목, 내용, 이미지 3장)  
- 댓글 (회원만)  
- 좋아요 (회원만)  
- Firebase Storage (WebP, 1600px, 700KB) 
  
### 제외 (Phase 2+)  
- V2 학습 경로 통합  
- 자료 공유, 공식 자료 승격  
- 알림, 검색 고도화, 다국어 
  
## Data Model  
  
### User  
uid, email, displayName, photoURL, role, createdAt, approvedAt, approvedBy  
  
### Post  
id, title, content, authorId, authorName, imageUrls[], viewCount, likeCount, commentCount, createdAt, updatedAt 
  
### Comment  
id, postId, authorId, authorName, content, likeCount, createdAt, updatedAt  
  
### Like  
id, userId, targetType (post/comment), targetId, createdAt 
  
## Route Structure  
- / (홈)  
- /community (자유게시판 목록)  
- /community/new (게시글 작성)  
- /community/[postId] (게시글 상세)  
- /login (로그인)  
- /signup (가입 신청)  
- /admin (관리자 ? 승인 관리) 
  
## Design Direction  
- 다크 배경 (네이비→블랙)  
- 네온 퍼플→시안 그라데이션  
- 사이버펑크/하이테크  
- {구피티} 중괄호 강조  
- 글래스모피즘 요소 
  
## Success Criteria (Phase 1)  
- 가입 신청 가능  
- 관리자 승인 가능  
- 회원 게시글 작성 (이미지 포함)  
- 회원 댓글 작성  
- 회원 좋아요  
- Firebase 월 비용 /usr/bin/bash 또는 최소  
- 빌드/배포 정상 
  
## Phase Roadmap  
  
### Week 1~2: Auth + User System  
- Firebase Auth 설정  
- User 모델 + 가입 신청  
- 관리자 승인 플로우  
- 역할 기반 접근 제어 
  
### Week 3~4: Community Core  
- 게시글 CRUD  
- 댓글 CRUD  
- 좋아요  
- 이미지 업로드 
  
### Week 5~6: UI/UX + Polish  
- 커뮤니티 페이지 디자인  
- 반응형  
- 에러/로딩 처리  
- 배포 
  
## Decision Log  
| Date | Decision | Notes |  
|------|----------|-------|  
| 2026-08-10 | Product Identity = B | 커뮤니티 중심 |  
| 2026-08-10 | V1/V2 = D | V2만 완성 |  
| 2026-08-10 | Community 우선 = B | Community부터 |  
| 2026-08-10 | 정리 전략 = C | 점진적 정리 |  
| 2026-08-10 | 커뮤니티 이름 = 구피티 | |  
| 2026-08-10 | Firebase = 기존 재사용 | |  
| 2026-08-10 | 초기 기능 = 자유게시판 + 댓글 + 좋아요 | 회원 승인제 |  
| 2026-08-10 | PRD 승인 | | 
