let task = [];
let done = false;

// Load tasks from local storage on page load
window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    task = JSON.parse(savedTasks);
    displayTasks();
  }
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(task));
}

function addTask(event) {
  event.preventDefault(); // Prevent form from submitting and reloading
  const input = document.getElementById("todo-input");
  const taskText = input.value.trim(); //input ko value linxa ani trim le white space haru hataunxa

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  task.push({
    text: taskText,
    done: false
  }); //task ma input ko value push garna
  console.log(task); //console ma task ko value dekhaucha
  input.value = ""; //input ko value lai khali garna
  saveTasks(); // Save after adding
  displayTasks();
}


function displayTasks() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  task.forEach((taskItem, index) => {
    if (taskItem.editing) {
      todoList.innerHTML += `
        <li class="task-item-edit">
          <input type="text" id="edit-input-${index}" value="${taskItem.text}">
          <button class="save-btn" onclick="saveEdit(${index})">Save</button>
          <button class="cancel-btn" onclick="cancelEdit(${index})">Cancel</button>
        </li>
      `;
    } else {
      todoList.innerHTML += `
        <li style="text-decoration: ${taskItem.done ? 'line-through' : 'none'}">
          <input type="checkbox" onchange="toggleDone(${index})" ${taskItem.done ? 'checked' : ''}>
          ${taskItem.text}
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
          <button class="delete-btn" onclick="removeTask(${index})">Delete</button>
        </li>
      `;
    }
  });
}

function toggleDone(index) {
  task[index].done = !task[index].done;
  saveTasks(); // Save after toggling
  displayTasks();
}

// Remove a task
function removeTask(index) {
  task.splice(index, 1);
  saveTasks(); // Save after removing
  displayTasks();
}

function editTask(index) {
  task[index].editing = true;
  displayTasks();
}

function saveEdit(index) {
  const input = document.getElementById(`edit-input-${index}`);
  const newText = input.value.trim();
  if (newText === "") {
    alert("Task cannot be empty.");
    return;
  }
  task[index].text = newText;
  delete task[index].editing;
  saveTasks();
  displayTasks();
}

function cancelEdit(index) {
  delete task[index].editing;
  displayTasks();
}

