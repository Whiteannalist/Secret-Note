const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  input.value = "";
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//เสียงซาว
const clickSound = document.getElementById('click-sound');

addBtn.addEventListener('click', () => {
  clickSound.currentTime = 0; // รีเซ็ตเสียงให้เล่นใหม่ทุกครั้ง
  clickSound.play();          // เล่นเสียง
  clickSound.volume = 0.4; // ปรับระดับเสียง (0.0 - 1.0)
});


