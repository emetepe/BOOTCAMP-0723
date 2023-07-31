import "./TodoList.css";

const template = () => `
<div class="containerTDL">
        <div class="todo-app">
            <h2>To-Do List <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690693684/tasks-icon-8_rlq7cs.png"></h2>
            <div class="rowTDL">
                <input type="text" id="input-box-tdl" placeholder="Añade aquí tu task">
                <button id="btnTDL">Añadir</button>
            </div>
            <ul id="list-container-tdl">
                <!-- <li class="checked">task 1</li>
                <li>task 2</li>
                <li>task 3</li> -->
            </ul>
        </div>
    </div>
`;

const addListeners = () => {
  const inputBox = document.getElementById("input-box-tdl");
  const listContainer = document.getElementById("list-container-tdl");
  const buttonTDL = document.getElementById("btnTDL");

  buttonTDL.addEventListener("click", () => {
    addTask();
  });

  // Add a task to the list
  const addTask = () => {
    if (inputBox.value === "") {
      alert("Por favor, escribe el nombre de la tarea");
    } else {
      let li = document.createElement("li");
      li.innerText = inputBox.value;
      listContainer.appendChild(li);
      let span = document.createElement("span");
      span.innerText = "\u00D7";
      li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
  };

  // check if the user press the enter key or remove the task
  listContainer.addEventListener(
    "click",
    function (event) {
      if (event.target.tagName === "li") {
        event.target.classList.toggle("checked");
        saveData();
      } else if (event.target.tagName === "span") {
        event.target.parentElement.remove();
        saveData();
      }
    },
    false
  );

  // save the data to the local storage
  const saveData = () => {
    localStorage.setItem("data", listContainer.innerHTML);
  }

  // show the data from the local storage
  const showData = () => {
    listContainer.innerHTML = localStorage.getItem("data");
  }
  showData();
};

export const TodoListApp = () => {
  document.querySelector("main").innerHTML = template();
  addListeners();
};
