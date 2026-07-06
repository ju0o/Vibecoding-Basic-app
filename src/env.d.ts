declare namespace NodeJS {
  interface ProcessEnv {
    /** 사이트 접근 게이트용 비밀번호의 SHA-256 hex 해시. .env.local에서 빌드 시 주입 (평문 금지). */
    readonly NEXT_PUBLIC_SITE_PASSWORD_HASH?: string
  }
}
