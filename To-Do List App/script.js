// Get references to DOM elements
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Event listener to add new tasks
addButton.addEventListener("click", addTask);

// Add a task
function addTask() {
  const taskText = todoInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Create a new list item
  const li = document.createElement("li");
  li.classList.add("task");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Add the delete functionality
  const deleteButton = li.querySelector(".delete-btn");
  deleteButton.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  // Mark task as completed when clicked
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Append the task to the list
  todoList.appendChild(li);

  // Clear input field
  todoInput.value = "";

  // Save tasks to localStorage
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll(".task");

  taskItems.forEach(item => {
    const taskText = item.querySelector(".task-text").innerText;
    const completed = item.classList.contains("completed");
    tasks.push({ text: taskText, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("task");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    // Add the delete functionality
    const deleteButton = li.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    // Mark task as completed when clicked
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    // Append the task to the list
    todoList.appendChild(li);
  });
}
