# Weekly Question 초안

AI를 활용해 작성한 초안입니다. 내용을 확인하고 수정한 뒤 직접 제출하세요.

제출 주소: https://forms.gle/QoxoyWP8ZiJTyJu67

## 1. 객관식 — Array에서 항목 찾기

아래 코드 실행 후 `selected.title`의 값은 무엇인가요?

```javascript
let tasks = [
    { id: 1, title: 'DOM 연습' },
    { id: 2, title: 'Array 복습' }
];
let selected = tasks.find(function (task) {
    return task.id === 2;
});
```

① DOM 연습  ② Array 복습  ③ 2  ④ undefined

정답: ② Array 복습

해설: `find()`는 조건을 만족하는 첫 번째 요소를 반환합니다. 이 코드에서는 ID가 2인 객체를 반환하므로 `selected.title`은 'Array 복습'입니다.

## 2. OX — Array와 화면 갱신

Array로 데이터를 관리하는 CRUD 서비스에서 표의 행을 DOM에서 제거하기만 하면, Array에서도 해당 데이터가 자동 삭제된다. (O / X)

정답: X

해설: DOM과 Array는 별개입니다. `filter()` 등으로 Array에서도 해당 항목을 제거해야 합니다. Array를 그대로 두고 `render()`를 다시 호출하면 삭제한 것처럼 보였던 항목이 다시 표시될 수 있습니다.
