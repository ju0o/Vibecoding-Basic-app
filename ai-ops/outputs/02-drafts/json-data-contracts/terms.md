# 용어 초안: json-data-contracts

## JSON
- category: 웹 개발
- shortDefinition: structured data를 string으로 표현해 network나 파일로 주고받는 text-based data format
- explanation: JSON은 JavaScript object syntax를 따르는 text-based data format이지만 JavaScript runtime object 자체는 아닙니다. API에서는 request/response body의 data shape를 표현하는 데 자주 쓰이며, parsing과 stringifying 단계를 분리해서 이해해야 합니다.
- related: ["JSON.parse", "JSON.stringify", "Data Contract"]

## Data Contract
- category: 웹 개발
- shortDefinition: API가 주고받을 data field와 value shape를 명시한 프로젝트 수준 약속
- explanation: Data Contract는 JSON 표준 자체가 아니라 endpoint별 request/response body가 어떤 field, type, optionality, error shape를 가져야 하는지 기록하는 운영 관점입니다. AI가 생성한 API client code를 검토할 때 실제 body가 계약과 맞는지 확인하는 기준이 됩니다.
- related: ["JSON", "API", "TypeScript"]

## JSON.parse
- category: JavaScript
- shortDefinition: JSON string을 JavaScript value나 object로 바꾸는 static method
- explanation: JSON.parse는 syntax가 맞는 JSON text를 JavaScript value로 deserialization하는 단계입니다. parsing 성공은 field와 type이 API contract에 맞다는 뜻이 아니므로, 외부 JSON은 parse 이후 별도 확인이 필요합니다.
- related: ["JSON", "Data Contract", "Validation"]

## JSON.stringify
- category: JavaScript
- shortDefinition: JavaScript value를 JSON string으로 변환하는 static method
- explanation: JSON.stringify는 JavaScript object나 value를 network body로 보낼 수 있는 JSON string representation으로 바꿉니다. API request body를 만들 때 Content-Type header와 함께 확인해야 합니다.
- related: ["JSON", "HTTP Body", "Content-Type"]

## Content-Type
- category: HTTP
- shortDefinition: HTTP message body의 media type을 알려 주는 representation header
- explanation: Content-Type은 response body나 POST/PUT request body가 어떤 media type인지 알려 줍니다. JSON body를 다룰 때 `application/json` 여부는 server와 client가 body를 어떻게 해석할지 결정하는 중요한 evidence입니다.
- related: ["HTTP Header", "JSON", "HTTP Body"]

## API Response Shape
- category: 백엔드
- shortDefinition: API response body가 갖는 field, type, nesting, array/object 구조
- explanation: API Response Shape는 status code만으로 알 수 없는 body의 실제 구조입니다. JSON syntax가 valid해도 expected response shape와 다르면 UI code와 TypeScript type, AI-generated client가 실패할 수 있습니다.
- related: ["Data Contract", "JSON", "API"]
