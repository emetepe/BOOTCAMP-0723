import "./TodoDD.css";

const template = () => `
<div class="board">
      <form id="todo-form">
        <input type="text" placeholder="New TODO..." id="todo-input" />
        <button type="submit">Add +</button>
      </form>

      <div class="lanes">
        <div class="swim-lane" id="todo-lane">
          <h3 class="heading">TODO</h3>

          <p class="task" draggable="true">Get groceries</p>
          <p class="task" draggable="true">Feed the dogs</p>
          <p class="task" draggable="true">Mow the lawn</p>
        </div>

        <div class="swim-lane">
          <h3 class="heading">Doing</h3>

          <p class="task" draggable="true">Binge 80 hours of Game of Thrones</p>
        </div>

        <div class="swim-lane">
          <h3 class="heading">Done</h3>

          <p class="task" draggable="true">
            Watch video of a man raising a grocery store lobster as a pet
          </p>
        </div>
      </div>
    </div>
`;

// const form = document.getElementById("todo-form");
// const input = document.getElementById("todo-input");
// const todoLane = document.getElementById("todo-lane");
// const droppables = document.querySelectorAll(".swim-lane");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value = input.value;

//   if (!value) return;

//   const newTask = document.createElement("p");
//   newTask.classList.add("task");
//   newTask.setAttribute("draggable", "true");
//   newTask.innerText = value;

//   newTask.addEventListener("dragstart", () => {
//     newTask.classList.add("is-dragging");
//   });

//   newTask.addEventListener("dragend", () => {
//     newTask.classList.remove("is-dragging");
//   });

//   todoLane.appendChild(newTask);

//   input.value = "";
// });

// draggables.forEach((task) => {
//   task.addEventListener("dragstart", () => {
//     task.classList.add("is-dragging");
//   });
//   task.addEventListener("dragend", () => {
//     task.classList.remove("is-dragging");
//   });
// });

// droppables.forEach((zone) => {
//   zone.addEventListener("dragover", (e) => {
//     e.preventDefault();

//     const bottomTask = insertAboveTask(zone, e.clientY);
//     const curTask = document.querySelector(".is-dragging");

//     if (!bottomTask) {
//       zone.appendChild(curTask);
//     } else {
//       zone.insertBefore(curTask, bottomTask);
//     }
//   });
// });

// const insertAboveTask = (zone, mouseY) => {
//   const els = zone.querySelectorAll(".task:not(.is-dragging)");

//   let closestTask = null;
//   let closestOffset = Number.NEGATIVE_INFINITY;

//   els.forEach((task) => {
//     const { top } = task.getBoundingClientRect();

//     const offset = mouseY - top;

//     if (offset < 0 && offset > closestOffset) {
//       closestOffset = offset;
//       closestTask = task;
//     }
//   });

//   return closestTask;
// };

export const TodoDD = () => {
  document.querySelector("main").innerHTML = template();
  
};
