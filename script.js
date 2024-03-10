// Drag and drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    updateCounts();
}

// Task details modal
var modal = document.getElementById("task-details");
var closeBtn = document.getElementsByClassName("close")[0];

// Show modal
function showModal(taskId) {
    modal.style.display = "block";
    // Populate modal with task details
    var task = document.getElementById(taskId);
    var title = task.querySelector(".task-title").textContent;
    var status = task.parentNode.getAttribute("id");
    var description = task.querySelector(".task-description").textContent;
    document.getElementById("task-title").value = title;
    document.getElementById("task-status").value = status;
    document.getElementById("task-description").value = description;
}

// Close modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Add task
function addTask(status) {
    var taskTitle = prompt("Enter task title:");
    if (taskTitle) {
        var task = document.createElement("div");
        task.classList.add("task");
        task.id = "task-" + Math.floor(Math.random() * 1000);
        task.draggable = true;
        task.setAttribute("draggable", "true");
        task.setAttribute("ondragstart", "drag(event)");
        task.innerHTML = "<h3 class='task-title'>" + taskTitle + "</h3><p class='task-description'></p>";
        document.getElementById(status).appendChild(task);
        updateCounts();
    }
}

// Save task changes
document.getElementById("save-task").addEventListener("click", function() {
    var title = document.getElementById("task-title").value;
    var status = document.getElementById("task-status").value;
    var description = document.getElementById("task-description").value;
    // Update task details
    var taskId = document.querySelector(".modal-content .task").id;
    var task = document.getElementById(taskId);
    task.querySelector(".task-title").textContent = title;
    task.querySelector(".task-description").textContent = description;
    // Move task to appropriate column if status changed
    if (task.parentNode.id !== status) {
        document.getElementById(status).appendChild(task);
        updateCounts();
    }
    modal.style.display = "none";
});

// Delete task
document.getElementById("delete-task").addEventListener("click", function() {
    var taskId = document.querySelector(".modal-content .task").id;
    var task = document.getElementById(taskId);
    task.parentNode.removeChild(task);
    updateCounts();
    modal.style.display = "none";
});

// Update counts of tasks under each status
function updateCounts() {
    document.getElementById("todo-count").textContent = document.getElementById("todo").childElementCount;
    document.getElementById("inprogress-count").textContent = document.getElementById("inprogress").childElementCount;
    document.getElementById("done-count").textContent = document.getElementById("done").childElementCount;
}
