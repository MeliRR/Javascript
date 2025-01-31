// Wait for the document to be fully loaded before executing any code
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const clearAllBtn = document.getElementById("clearAllBtn");
  
    // Load tasks from localStorage if available
    loadTasks();
  
    // Add new task to the list
    addTaskBtn.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const task = {
          text: taskText,
          completed: false,
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = ""; // Clear input field
      } else {
        alert("Please enter a task!");
      }
    });
  
    // Clear all tasks
    clearAllBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
      }
    });
  
    // Delete a task
    taskList.addEventListener("click", function (event) {
      if (event.target.classList.contains("deleteBtn")) {
        const index = event.target.dataset.index;
        tasks.splice(index, 1); // Remove task from array
        saveTasks();
        renderTasks();
      }
    });
  
    // Render all tasks to the list
    function renderTasks() {
      taskList.innerHTML = ""; // Clear the list before rendering
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="${task.completed ? "completed" : ""}">${task.text}</span>
          <button class="deleteBtn" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
      });
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Load tasks from localStorage
    function loadTasks() {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
      }
    }
  
    // Mark a task as completed (click to toggle)
    taskList.addEventListener("click", function (event) {
      if (event.target.tagName === "SPAN") {
        const index = Array.from(taskList.children).indexOf(event.target.parentElement);
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      }
    });
  
    // Initial empty task array
    let tasks = [];
  });