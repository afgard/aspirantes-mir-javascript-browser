// Lista de tareas
let tasks = [];

// Referencias a elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const deleteCompletedBtn = document.getElementById('delete-completed');

// Función para agregar una tarea a la lista
function addTask(event) {
  event.preventDefault();
  const taskTitle = taskInput.value.trim();
  if (taskTitle === '') return;

  const newTask = {
    id: Date.now(),
    title: taskTitle,
    completed: false
  };

  tasks.push(newTask);
  renderTask(newTask);
  taskInput.value = '';
}

// Función para marcar una tarea como completada o no completada
function toggleTaskCompleted(event) {
  const taskId = parseInt(event.target.dataset.taskId);
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    event.target.parentNode.classList.toggle('is-completed', task.completed);
  }
}

// Función para eliminar una tarea de la lista
function deleteTask(event) {
  const taskId = parseInt(event.target.dataset.taskId);
  tasks = tasks.filter(task => task.id !== taskId);
  event.target.parentNode.remove();
}

// Función para renderizar una tarea en la lista
function renderTask(task) {
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <input type="checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
    <span class="${task.completed ? 'is-completed' : ''}">${task.title}</span>
    <button type="button" data-task-id="${task.id}">Delete</button>
  `;

  taskList.appendChild(taskItem);
}

// Función para eliminar todas las tareas completadas
function deleteCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  taskList.innerHTML = '';
  tasks.forEach(task => renderTask(task));
}

// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('change', toggleTaskCompleted);
taskList.addEventListener('click', event => {
  if (event.target.nodeName === 'BUTTON') {
    deleteTask(event);
  }
});
deleteCompletedBtn.addEventListener('click', deleteCompletedTasks);
