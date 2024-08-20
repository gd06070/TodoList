document.addEventListener("DOMContentLoaded", function () {
    const newInput = document.querySelector("#new_input");
    const newSubmitBtn = document.querySelector("#newSubmitBtn");
    const todoListContainer = document.querySelector("#todo_list_container");

    // 뒤로가기
    document.querySelector("#backBtn").addEventListener("click", function () {
        window.history.back();
    });

    // To-do 추가
    function addTodo() {
        const todoText = newInput.value.trim(); // 입력값을 가져오고, 공백 제거

        if (todoText === "") {
            alert("To-do 항목을 입력하세요!");
            return;
        }

        // To-do 항목을 담는 컨테이너 생성
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        // To-do 텍스트를 담는 요소 생성
        const todoTextSpan = document.createElement("span");
        todoTextSpan.classList.add("todo-text");
        todoTextSpan.textContent = todoText;
        todoItem.appendChild(todoTextSpan);

        // 삭제 버튼 추가
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.addEventListener("click", function () {
            todoItemWrapper.remove(); // 항목 삭제
        });

        // 수정 버튼 추가
        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.addEventListener("click", function () {
            editTodoItem(todoItem, todoTextSpan);
        });

        // 버튼 컨테이너 
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer");
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

         // To-do 항목을 감싸는 컨테이너 생성
        const todoItemWrapper = document.createElement("div");
        todoItemWrapper.classList.add("todo-item-wrapper");

        // To-do 텍스트와 버튼 컨테이너를 todoItemWrapper에 추가
        todoItemWrapper.appendChild(todoItem);
        todoItemWrapper.appendChild(buttonContainer);

        // To-do 리스트 컨테이너에 todoItemWrapper 추가
        todoListContainer.appendChild(todoItemWrapper);


        // 입력 필드 초기화
        newInput.value = "";
    }

    // To-do 리스트 수정 구현
    function editTodoItem(todoItem, todoTextSpan) {
        const currentText = todoTextSpan.textContent;

        // 기존 텍스트를 숨기고 입력 필드를 추가
        todoTextSpan.style.display = "none";
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = currentText;
        inputField.classList.add("edit-input");

        // 편집 완료 버튼 추가
        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = "저장";
        confirmBtn.classList.add("confirm-btn");

        todoItem.insertBefore(inputField, todoTextSpan);
        todoItem.insertBefore(confirmBtn, todoTextSpan.nextSibling);

        // 저장 버튼 클릭 시
        confirmBtn.addEventListener("click", function () {
            const updatedText = inputField.value.trim();

            if (updatedText !== "") {
                todoTextSpan.textContent = updatedText;
            }

            // 수정이 완료되면 다시 텍스트로 변경
            todoItem.removeChild(inputField);
            todoItem.removeChild(confirmBtn);
            todoTextSpan.style.display = "inline";
        });
    }

    // "추가하기" 버튼 클릭 시 투두 항목 추가
    newSubmitBtn.addEventListener("click", addTodo);

    // 엔터 키로도 추가할 수 있도록 설정 (선택 사항)
    newInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });
});
