# 용어 초안: http-request-response

## HTTP Request
- category: 웹 개발
- shortDefinition: client가 server에 resource나 작업을 요청하기 위해 보내는 HTTP message
- explanation: HTTP Request는 method, resource path, protocol version, optional headers, 일부 method의 body로 구성됩니다. AI에게 API 오류를 설명할 때 request method, URL/path, headers, body를 분리해 주면 server가 무엇을 받았는지 추적할 수 있습니다.
- related: ["HTTP Response", "HTTP Method", "HTTP Header"]

## HTTP Response
- category: 웹 개발
- shortDefinition: server가 client request에 대해 status, headers, optional body로 돌려주는 HTTP message
- explanation: HTTP Response는 protocol version, status code, status message, headers, optional body를 포함합니다. response status만 보지 않고 response headers와 body까지 함께 확인해야 API와 page load 문제를 정확히 나눌 수 있습니다.
- related: ["HTTP Request", "Status Code", "HTTP Body"]

## HTTP Method
- category: 웹 개발
- shortDefinition: client가 resource에 대해 수행하려는 operation을 나타내는 request method
- explanation: HTTP Method는 GET, POST, PUT, DELETE처럼 request가 어떤 종류의 작업을 원하는지 표현합니다. AI가 API 호출을 만들거나 수정할 때 method와 path가 의도한 작업과 맞는지 확인하는 것이 첫 검토 지점입니다.
- related: ["HTTP Request", "API", "REST"]

## HTTP Header
- category: 웹 개발
- shortDefinition: HTTP request나 response에 붙는 metadata field
- explanation: HTTP Header는 content type, accept, authentication, cookies 같은 message metadata를 전달하는 위치입니다. request와 response 모두 headers를 가질 수 있으므로 오류 분석에서는 body만 보지 말고 headers도 함께 기록해야 합니다.
- related: ["HTTP Request", "HTTP Response", "HTTP Body"]

## HTTP Body
- category: 웹 개발
- shortDefinition: HTTP message에서 실제 resource representation이나 전송 payload가 들어갈 수 있는 부분
- explanation: HTTP Body는 일부 request method나 response에서 data payload를 담는 부분입니다. API 응답 JSON, form 제출 payload, HTML document content처럼 message의 실제 내용이 들어갈 수 있으므로 status code와 함께 읽어야 합니다.
- related: ["HTTP Header", "HTTP Response", "JSON"]

## Status Code
- category: 웹 개발
- shortDefinition: HTTP response에서 request가 성공했는지와 그 이유를 나타내는 숫자 코드
- explanation: Status Code는 2xx, 3xx, 4xx, 5xx 같은 class로 request 결과를 분류합니다. status code는 중요한 evidence이지만 오류 원인을 단독으로 확정하지 않으므로 method, path, headers, body와 함께 봐야 합니다.
- related: ["HTTP Response", "API", "Debugging"]
