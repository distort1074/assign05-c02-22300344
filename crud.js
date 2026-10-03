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
let editingId = null;

const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const subjectInput = document.getElementById('task-subject');
const dateInput = document.getElementById('task-date');
const priorityInput = document.getElementById('task-priority');
const statusInput = document.getElementById('task-status');
const list = document.getElementById('task-list');
const message = document.getElementById('message');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

function resetForm() {
    editingId = null;
    form.reset();
    titleInput.setCustomValidity('');
    subjectInput.setCustomValidity('');
    document.getElementById('form-heading').textContent = '할 일 등록';
    saveButton.textContent = '등록';
    cancelButton.hidden = true;
}

function editTask(id) {
    const task = tasks.find(function (task) { return task.id === id; });
    if (!task) return;
    resetForm();
    editingId = id;
    titleInput.value = task.title;
    subjectInput.value = task.subject;
    dateInput.value = task.dueDate;
    priorityInput.value = task.priority;
    statusInput.value = task.status;
    document.getElementById('form-heading').textContent = '할 일 수정 · #' + id;
    saveButton.textContent = '수정 저장';
    cancelButton.hidden = false;
    message.textContent = '내용을 변경한 뒤 수정 저장을 누르세요.';
    titleInput.focus();
}

cancelButton.addEventListener('click', function () {
    resetForm();
    message.textContent = '수정을 취소했습니다.';
    titleInput.focus();
});

// 등록과 수정에서 함께 사용할 입력 검사입니다.
function validate() {
    titleInput.setCustomValidity(titleInput.value.trim() ? '' : '할 일을 입력하세요.');
    subjectInput.setCustomValidity(subjectInput.value.trim() ? '' : '과목을 입력하세요.');
    return form.reportValidity();
}

titleInput.addEventListener('input', function () { titleInput.setCustomValidity(''); });
subjectInput.addEventListener('input', function () { subjectInput.setCustomValidity(''); });

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) return;

    const task = {
        id: nextId,
        title: titleInput.value.trim(),
        subject: subjectInput.value.trim(),
        dueDate: dateInput.value,
        priority: priorityInput.value,
        status: statusInput.value
    };
    if (editingId === null) {
        tasks.push(task);
        nextId++;
        message.textContent = '할 일을 등록했습니다.';
    } else {
        const original = tasks.find(function (item) { return item.id === editingId; });
        original.title = task.title;
        original.subject = task.subject;
        original.dueDate = task.dueDate;
        original.priority = task.priority;
        original.status = task.status;
        message.textContent = '할 일을 수정했습니다.';
    }
    resetForm();
    render();
    titleInput.focus();
});

// Array의 현재 내용으로 표 전체를 다시 만듭니다.
function render() {
    list.textContent = '';
    document.getElementById('task-count').textContent = '전체 ' + tasks.length + '개';

    if (tasks.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 7;
        cell.className = 'empty';
        cell.textContent = '등록된 할 일이 없습니다. 첫 번째 할 일을 추가하세요.';
        row.appendChild(cell);
        list.appendChild(row);
        return;
    }

    tasks.forEach(function (task) {
        const row = document.createElement('tr');
        const values = [task.id, task.title, task.subject, task.dueDate, task.priority, task.status];
        values.forEach(function (value) {
            const cell = document.createElement('td');
            // 입력한 문자열을 HTML로 실행하지 않고 글자로 표시합니다.
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement('td');
        actions.className = 'row-actions';
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'edit-button';
        editButton.textContent = '수정';
        editButton.addEventListener('click', function () { editTask(task.id); });
        editButton.setAttribute('aria-label', task.title + ' 수정');

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-button';
        deleteButton.textContent = '삭제';
        deleteButton.disabled = true;
        deleteButton.setAttribute('aria-label', task.title + ' 삭제');

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        row.appendChild(actions);
        list.appendChild(row);
    });
}

render();
