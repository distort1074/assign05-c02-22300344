// 서버와 Database 대신 이 Array에 학습 할 일을 저장합니다.
// 페이지를 새로고침하면 아래 초기 데이터로 돌아갑니다.
let tasks = [
    {
        id: 1,
        title: 'DOM 추가와 삭제 연습',
        subject: '오픈소스 소프트웨어',
        dueDate: '2026-10-04',
        priority: '높음',
        status: '진행 중'
    },
    {
        id: 2,
        title: 'Array 메서드 정리',
        subject: 'JavaScript',
        dueDate: '2026-10-05',
        priority: '보통',
        status: '시작 전'
    },
    {
        id: 3,
        title: 'HTML Form 복습',
        subject: '웹 프로그래밍',
        dueDate: '2026-10-03',
        priority: '낮음',
        status: '완료'
    }
];

// 새 항목을 추가할 때 사용할 번호입니다. 삭제한 번호는 다시 사용하지 않습니다.
let nextId = 4;
