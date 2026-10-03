# Assignment 2–3 · 학습 할 일 관리

HTML, CSS, JavaScript로 과목별 학습 할 일을 관리하는 한 페이지 서비스를 만듭니다.

## Deployment

- 수업 저장소: https://github.com/2026-2-OSS/assign05-c02-22300344
- Vercel 배포 주소: https://assign05-c02-22300344.vercel.app/
- 2026-10-04, **학습 할 일 관리** 버전의 배포와 Chrome 데스크톱·모바일 동작 검사를 완료했습니다.
- 로컬 실행: `index.html`을 브라우저에서 엽니다. 별도 서버나 빌드가 필요하지 않습니다.

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

| Field | 의미 | 입력 방식 | 검증 |
| --- | --- | --- | --- |
| id | 항목 고유 번호 | 자동 부여 | 삭제한 번호는 재사용하지 않음 |
| title | 할 일 | text | 필수, 공백 제외 1~60자 |
| subject | 과목 | text | 필수, 공백 제외 1~30자 |
| dueDate | 마감일 | date | 필수, 0001~9999년 사이 유효한 날짜 |
| priority | 우선순위 | select | 낮음 / 보통 / 높음 중 선택 |
| status | 진행 상태 | select | 시작 전 / 진행 중 / 완료 중 선택 |

### CRUD 구현 방법

1. **Create:** Form 검증 후 새 객체를 `tasks` Array에 추가합니다.
2. **Read:** `render()`에서 Array를 표로 표시합니다.
3. **Update:** 수정 버튼으로 기존 값을 Form에 채우고 검증 후 저장합니다.
4. **Delete:** `confirm()` 확인 후 Array에서 항목을 삭제합니다.

서버, Database, localStorage를 사용하지 않습니다. 데이터는 JavaScript Array에 저장하며 새로고침하면 초기 데이터로 돌아갑니다.

## STEP 3. 초기 Array

- 파일: `crud.js`
- `tasks` Array에 6개 필드를 가진 초기 학습 할 일 3개를 작성했습니다.
- 초기 ID는 1, 2, 3이며, 새 항목에 사용할 `nextId`는 4부터 시작합니다.
- `crud.html`에 스크립트를 연결하고 `render()`에서 Array의 내용을 출력합니다.
- 이번 초기 Array 작성과 데이터 검사는 OpenAI Codex를 활용했습니다.

## STEP 4. CRUD UI

- `crud.html`: 할 일, 과목, 마감일, 우선순위, 진행 상태를 입력하는 Form과 목록 Table을 작성했습니다.
- `crud.css`: 입력 영역과 출력 영역을 구분하는 기본 스타일을 적용했습니다.
- 화면 구조를 먼저 작성한 뒤, 후속 커밋에서 등록·수정·삭제 이벤트를 연결했습니다.
- UI 코드 작성과 화면 검사는 OpenAI Codex를 활용했습니다.

## STEP 5~11. 기능 구현

- **Create:** `submit` 이벤트에서 `validate()`가 통과하면 `tasks.push()`로 추가하고 입력 Form을 초기화합니다.
- **Read:** `forEach()`로 행을 만들고 `textContent`로 값을 표시합니다. 최초 실행과 모든 데이터 변경 후 `render()`를 호출합니다.
- **Update:** `find()`로 항목을 찾아 Form에 채웁니다. `editingId`로 등록과 수정을 구분하고 원래 ID를 유지합니다. 취소하면 원본 객체는 변경되지 않습니다.
- **Delete:** `confirm()` 확인 시 `filter()`로 Array에서 제거합니다. 수정 중인 항목을 삭제하면 Form도 초기화합니다.
- **Validation:** 공백을 제외한 필수값, 문자열 길이, 날짜의 유효성·범위, Select 선택값을 검증합니다. 등록과 수정은 같은 검증 함수를 사용합니다.
- **CSS:** Form과 Table을 구분하고, 모바일에서는 입력 필드를 세로로 배치합니다. 표는 키보드와 터치로 좌우 스크롤할 수 있습니다.
- **홈 연결:** `index.html`에서 DOM 실습과 CRUD 페이지로 이동할 수 있습니다.

## Key Learning — 핵심 개념 정리

1. **DOM:** JavaScript로 요소를 생성하고 목록에 연결하거나 제거하여 화면을 바꿉니다.
2. **Event:** 사용자 제출·클릭 시 함수를 실행합니다. `preventDefault()`는 Form 제출로 인한 새로고침을 막습니다.
3. **Array와 화면:** 실제 데이터는 Array에 두고 `render()`로 화면과 동기화합니다. 화면만 삭제하면 데이터는 남아 있습니다.

## JavaScript

| 기능 | 코드에서 하는 일 |
| --- | --- |
| `getElementById()` | Form, 입력, 목록 요소 선택 |
| `addEventListener()` | submit, click, input 이벤트 처리 |
| `createElement()` / `appendChild()` | 표의 행, 셀, 버튼 생성 및 연결 |
| `remove()` | DOM 실습 항목 삭제 |
| `trim()` | 입력 앞뒤 공백 제거 |
| `push()` | 새 할 일을 Array에 추가 |
| `find()` | ID가 일치하는 항목 찾기 |
| `filter()` | 삭제 대상 ID를 제외한 Array 생성 |
| `forEach()` | 전체 항목을 표로 출력 |
| `includes()` | Select 값이 허용된 값인지 확인 |
| `checkValidity()` / `reportValidity()` | HTML 입력 제약 검사 및 오류 안내 |
| `setCustomValidity()` | 공백·문자열 길이 등의 검증 메시지 지정 |
| `render()` | Array를 화면으로 출력하는 사용자 정의 함수 |

## Problem & Solution

- 공백만 입력하면 HTML `required`만으로는 막지 못하므로 `trim()`으로 검사합니다.
- 항목을 삭제한 뒤 ID가 겹치지 않도록 Array 길이와 별개인 `nextId`를 사용합니다.
- 입력한 HTML 문자열이 실행되지 않도록 `innerHTML` 대신 `textContent`로 출력합니다.
- 오류 수정 후 이전 검증 메시지가 남지 않도록 `input` 이벤트에서 오류 상태를 해제합니다.
- 수정 중인 항목을 삭제하면 `editingId`와 Form도 초기화하여 삭제된 대상을 수정하지 않도록 합니다.

## Reflection

직접 실행해 본 결과, 이해한 점, 수정하고 싶은 부분을 본인의 말로 작성할 예정입니다.

## 검증 방법

서비스 실행에는 외부 라이브러리가 필요하지 않습니다. 아래 Playwright는 개발용 브라우저 검사에만 사용합니다. Chrome과 Node.js가 설치되어 있어야 합니다.

```sh
npm install --no-save --package-lock=false playwright
node browser-check.cjs
```

로컬 Chrome 1366px / 390px에서 DOM 추가·삭제, 초기 데이터, CRUD, 등록·수정 검증, 삭제 확인·취소, 수정 취소, 빈 목록, ID 유지, 새로고침, 페이지 이동, 가로 넘침을 검사했습니다. 모두 통과했고 JavaScript 실행 오류는 없었습니다.

배포 사이트에서도 같은 검사를 실행하여 통과했습니다. 다음 명령으로 다시 확인할 수 있습니다.

```sh
node browser-check.cjs https://assign05-c02-22300344.vercel.app/
```

## 현재 진행 상황

- STEP 1: 구현 및 브라우저 확인 완료
- STEP 2: 주제와 필드 설계 완료
- STEP 3: 초기 Array 작성 완료
- STEP 4: 입력 Form과 목록 Table 작성 완료
- STEP 5~10: CRUD, Validation, CSS 구현 및 로컬 브라우저 검사 완료
- STEP 11: index 연결, 두 저장소 Push, Vercel 배포 및 배포 사이트 검사 완료
- Weekly Question: `weekly_questions.md` 초안 검토 후 Google Form 제출 필요
- README의 개인 학습 내용 및 Reflection 작성 필요

## AI / Search Usage

**Tool** - OpenAI Codex

**Purpose** - DOM 실습과 학습 할 일 CRUD 서비스의 단계별 구현·검사 지원

**Used** - AI가 DOM 및 CRUD 코드, 스타일, 문서와 검사 코드를 작성했으며, 사용자 승인에 따라 단계별 커밋·Push에도 활용함

**What I Learned — 코드에서 정리한 개념**

- `createElement()`는 새로운 HTML 요소를 만들고, `appendChild()`는 만든 요소를 부모 요소에 연결합니다.
- `addEventListener()`는 버튼 클릭이나 Form 제출처럼 특정 이벤트가 발생했을 때 실행할 함수를 등록합니다.
- `preventDefault()`는 Form 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
- `trim()`은 문자열 앞뒤 공백을 제거하므로, 공백만 입력한 경우를 검사할 때 사용할 수 있습니다.
- `push()`는 Array의 끝에 새 데이터를 추가합니다. 이 서비스에서는 새로운 할 일을 등록할 때 사용합니다.
- `find()`는 조건을 만족하는 첫 번째 요소를 반환합니다. 수정할 항목의 ID를 비교해 해당 객체를 찾는 데 사용합니다.
- `filter()`는 조건을 만족하는 요소로 새 Array를 만듭니다. 삭제할 ID를 제외한 Array를 다시 저장하여 삭제를 구현합니다.
- Array의 값이 바뀌어도 화면은 자동으로 갱신되지 않습니다. 데이터 변경 후 `render()`를 호출하여 목록을 다시 출력합니다.
- 등록과 수정에서 같은 검증 함수를 사용하면 필수값, 문자열 길이, 날짜와 선택값에 동일한 조건을 적용할 수 있습니다.
- `textContent`는 입력값을 HTML로 해석하지 않고 문자 그대로 표시합니다.
- 이 서비스의 데이터는 메모리의 Array에만 저장되므로, 페이지를 새로고침하면 초기 데이터로 돌아갑니다.
