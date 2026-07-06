# 용어 초안: web-security-basics

## Same-Origin Policy
- category: 웹 보안
- shortDefinition: 한 origin의 document나 script가 다른 origin resource와 상호작용하는 방식을 제한하는 browser security mechanism
- explanation: Same-Origin Policy는 malicious document가 사용자가 로그인한 다른 origin의 sensitive data를 읽는 위험을 줄이는 기본 browser 방어선입니다. CORS는 이 기본 제한 위에서 server가 허용할 cross-origin access를 HTTP headers로 표현하는 mechanism입니다.
- related: ["Origin", "CORS", "Browser Security"]

## Origin
- category: 웹 보안
- shortDefinition: URL의 protocol, host, port 조합으로 browser가 출처를 판단하는 기준
- explanation: Origin은 domain 느낌이 아니라 scheme, host, port tuple입니다. path가 같아 보여도 port나 scheme이 다르면 cross-origin일 수 있으므로 CORS debugging에서는 page origin과 target origin을 정확히 기록해야 합니다.
- related: ["Same-Origin Policy", "CORS", "HTTP"]

## CORS
- category: 웹 보안
- shortDefinition: server가 허용할 cross-origin access를 HTTP headers로 표현하는 mechanism
- explanation: CORS는 browser의 same-origin policy 아래에서 cross-origin response를 calling script가 읽을 수 있는지 판단하게 하는 HTTP-header based mechanism입니다. client fetch option 하나가 아니라 request origin, preflight, response CORS headers를 함께 확인해야 합니다.
- related: ["Same-Origin Policy", "Preflight Request", "HTTP Header"]

## Preflight Request
- category: 웹 보안
- shortDefinition: browser가 actual cross-origin request 전에 server 허용 여부를 확인하기 위해 보내는 request
- explanation: Preflight Request는 actual request의 method와 headers를 담아 server가 cross-origin request를 허용할지 확인합니다. Network tab에서 OPTIONS request가 먼저 보일 수 있으며, CORS 문제를 분석할 때 중요한 evidence입니다.
- related: ["CORS", "HTTP Method", "HTTP Header"]

## XSS
- category: 웹 보안
- shortDefinition: malicious script가 trusted website output에 injected되어 실행될 수 있는 injection 공격
- explanation: XSS는 untrusted input이 validation이나 encoding 없이 generated output에 포함될 때 발생할 수 있습니다. 핵심 검토 지점은 문자열 자체보다 그 data가 어떤 rendering context로 들어가 browser에서 실행될 수 있는지입니다.
- related: ["CSP", "Input Validation", "Rendering Context"]

## CSRF
- category: 웹 보안
- shortDefinition: authenticated browser가 trusted site에 unwanted action을 보내도록 속이는 공격
- explanation: CSRF는 사용자의 browser가 이미 인증된 상태일 때 forged authenticated request와 legitimate request를 server가 구분하지 못하는 문제입니다. mutation request에서는 anti-CSRF token, same-site cookie 정책, server-side intent validation을 확인해야 합니다.
- related: ["Authentication", "Cookie", "HTTP Request"]

## CSP
- category: 웹 보안
- shortDefinition: browser에게 site code가 할 수 있는 일을 제한하라고 지시하는 Content Security Policy
- explanation: CSP는 certain security threats risk를 줄이기 위해 website가 browser에 restrictions를 instruct하는 방어 계층입니다. XSS를 대체하는 단일 해결책은 아니지만 script source, inline execution, resource loading을 제한하는 signal로 활용됩니다.
- related: ["XSS", "HTTP Header", "Browser Security"]
