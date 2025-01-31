let tasks = [];

// DOM elements
const taskListElement = document.getElementById("task-list");
const taskFormElement = document.getElementById("task-form");
const taskDescInput = document.getElementById("task-desc");
const taskPriorityInput = document.getElementById("task-priority");

document.getElementById("add-task-btn").addEventListener("click", showAddTaskForm);
document.getElementById("view-tasks-btn").addEventListener("click", viewTasks);
document.getElementById("remove-task-btn").addEventListener("click", removeTask);
document.getElementById("edit-task-btn").addEventListener("click", editTask);
document.getElementById("save-btn").addEventListener("click", saveTasks);
document.getElementById("exit-btn").addEventListener("click", exitApp);

document.getElementById("submit-task").addEventListener("click", addTask);
document.getElementById("cancel-task").addEventListener("click", hideTaskForm);

function showAddTaskForm() {
    taskFormElement.style.display = "block";
}

function hideTaskForm() {
    taskFormElement.style.display = "none";
    clearTaskForm();
}

function clearTaskForm() {
    taskDescInput.value = "";
    taskPriorityInput.value = "";
}

function addTask() {
    const description = taskDescInput.value.trim();
    const priority = taskPriorityInput.value.trim().toLowerCase();

    if (description && priority) {
        tasks.push({ description, priority });
        console.log(`Task added: ${description} with priority ${priority}`);
        hideTaskForm();
        viewTasks();
    } else {
        alert("Please fill in both description and priority.");
    }
}

function viewTasks() {
    if (tasks.length === 0) {
        taskListElement.innerHTML = "<p>No tasks to display.</p>";
    } else {
        taskListElement.innerHTML = "";
        tasks.forEach((task, index) => {
            taskListElement.innerHTML += `
                <div class="task">
                    <span>[${task.priority}] ${task.description}</span>
                    <button onclick="removeTask(${index})">Remove</button>
                    <button onclick="editTask(${index})">Edit</button>
                </div>
            `;
        });
    }
}

function removeTask(index) {
    tasks.splice(index, 1);
    viewTasks();
}

function editTask(index) {
    const task = tasks[index];
    taskDescInput.value = task.description;
    taskPriorityInput.value = task.priority;
    taskFormElement.style.display = "block";
    document.getElementById("submit-task").onclick = () => updateTask(index);
}

function updateTask(index) {
    tasks[index].description = taskDescInput.value.trim();
    tasks[index].priority = taskPriorityInput.value.trim().toLowerCase();
    hideTaskForm();
    viewTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Tasks saved successfully!");
}

function exitApp() {
    window.close();
}
