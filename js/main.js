document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.querySelector("#calendar tbody");
    const monthYear = document.querySelector("#monthYear");
    const prevMonthBtn = document.querySelector("#prev-month");
    const nextMonthBtn = document.querySelector("#next-month");
    
    let currentDate = new Date(2024, 7); // 0 = 1월이라 1적게 써야함

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
                    cell.classList.add('current-month');
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

    renderCalendar(currentDate);


    //createTodo btn 모달 테스트
    const btn = document.getElementById("createTodo_Btn"); // 모달을 띄우는 버튼 요소 가져오기

    btn.onclick = function () {
        modal.style.display = "block"; // 버튼을 클릭하면 모달을 보이게 함
      };
});
