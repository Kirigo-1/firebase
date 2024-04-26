// Internalize Firebase with your config
firebase.internalizeApp({
    apiKey: "AIzaSyC1G-ZLPEZA9LU7YAjpu0KLpPj9y5zXgu4",
    authDomain: "task-managment-app-a2fbe.firebaseapp.com",
    projectId: "task-managment-app-a2fbe",
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input")
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("task").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Corrected typo
        });
        taskInput.value = "";
    }
}

// Function to render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>`; // Corrected typo
    taskList.appendChild(taskItem);
}

// Real-time Listener for tasks
db.collection("task")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task
function deleteTask(id) {
    db.collection("task").doc(id).delete();
}
