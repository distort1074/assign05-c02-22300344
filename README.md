# Assignment 2–3 · 학습 할 일 관리

HTML, CSS, JavaScript로 과목별 학습 할 일을 관리하는 한 페이지 서비스를 만듭니다.

## STEP 1. JavaScript DOM Practice

- 파일: `js_dynamic.html`
- 입력 내용을 목록에 추가하고 입력창을 초기화합니다.
- 각 항목의 삭제 버튼으로 해당 항목을 제거합니다.
- 빈 문자열과 공백만 있는 입력을 추가하지 않습니다.
- Chrome에서 데스크톱과 모바일 화면의 추가·삭제 동작을 확인했습니다.

## STEP 2. CRUD 서비스 주제와 데이터 설계

### 주제

과목별 학습 할 일 관리. 해야 할 공부와 과제를 등록하고, 진행 상태를 수정하거나 필요 없는 항목을 삭제합니다.

### 데이터 Field

총 6개 필드를 사용하며, `id`를 제외한 5개 필드는 Form에서 입력합니다.

| Field | 의미 | 입력 방식 | 예정된 검증 |
| --- | --- | --- | --- |
| id | 항목 고유 번호 | 자동 부여 | 삭제한 번호는 재사용하지 않음 |
| title | 할 일 | text | 필수, 공백 제외 1~60자 |
| subject | 과목 | text | 필수, 공백 제외 1~30자 |
| dueDate | 마감일 | date | 필수, 유효한 날짜 |
| priority | 우선순위 | select | 낮음 / 보통 / 높음 중 선택 |
| status | 진행 상태 | select | 시작 전 / 진행 중 / 완료 중 선택 |

### 구현 계획

1. **Create:** Form 검증 후 새 객체를 `tasks` Array에 추가합니다.
2. **Read:** `render()`에서 Array를 표로 표시합니다.
3. **Update:** 수정 버튼으로 기존 값을 Form에 채우고 검증 후 저장합니다.
4. **Delete:** `confirm()` 확인 후 Array에서 항목을 삭제합니다.

서버, Database, localStorage를 사용하지 않습니다. 데이터는 JavaScript Array에 저장하며 새로고침하면 초기 데이터로 돌아가도록 구현할 예정입니다.

## 현재 진행 상황

- STEP 1: 구현 및 브라우저 확인 완료
- STEP 2: 주제와 필드 설계 완료
- STEP 3 이후: 아직 구현하지 않음
- 이번 재시작 버전의 배포 확인: 아직 진행하지 않음

## AI / Search Usage

Tool - OpenAI Codex

Purpose - DOM 실습 페이지 구현 및 CRUD 서비스 설계 지원

Used - AI가 작성한 DOM 추가·삭제 코드와 데이터 필드 설계를 사용했으며, 브라우저 검사와 승인 후 커밋·Push에도 활용함

What I Learned - 예를 들어 확인했다면 “createElement()는 요소를 만들고, appendChild()는 해당 요소를 화면의 목록에 연결한다는 것을 이해함.”\]
