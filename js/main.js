document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.querySelector("#calendar tbody");
    const monthYear = document.querySelector("#monthYear");
    const prevMonthBtn = document.querySelector("#prev-month");
    const nextMonthBtn = document.querySelector("#next-month");
    const createTodoBtn = document.getElementById("createTodo_Btn"); //20240820 추가 
    
    let currentDate = new Date(); // 0 = 1월이라 1적게 써야함
    let today = new Date();

    function renderCalendar(date) {
        calendar.innerHTML = '';
        monthYear.textContent = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // 이전 달의 마지막 날짜 계산
        const prevLastDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        // 요일 아래의 날짜 생성
        let day = 1;
        let nextMonthDay = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 7; j++) { //요일 반복 돌리기
                const cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.textContent = prevLastDate - firstDay + j + 1;
                    cell.classList.add('prev-month');
                } else if (day > lastDate) {
                    cell.textContent = nextMonthDay++;
                    cell.classList.add('next-month');
                } else {
                    cell.textContent = day;
                    // 20240820 추가
                    // 오늘 날짜에 표시 추가
                    if (date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === today.getMonth() &&
                        day === today.getDate()) {
                        cell.classList.add('today');
                    } else {
                        cell.classList.add('current-month');
                    }
                    day++;   
                }
                row.appendChild(cell);
            }
            calendar.appendChild(row);
        }
    }

    prevMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // 202040820 추가 => 투두리스트 생성 버튼 동작
    createTodoBtn.addEventListener("click", function() {
        window.location.href = 'create.html'; 
    });

    renderCalendar(currentDate);


    //createTodo btn 모달 테스트
    
});
