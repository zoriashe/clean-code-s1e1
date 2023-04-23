const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector("#add-button");
const incompleteTaskHolder = document.querySelector("#incompleteTasks");
const completedTasksHolder = document.querySelector("#completed-tasks");
const completedTasksChildren = completedTasksHolder.children
const incompleteTasksChildren = incompleteTaskHolder.children

const createNewTaskElement = function(taskString) {
  const label = document.createElement("label");
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = './remove.svg';

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

const addTask = function() {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}
 
const editTask = function() { 
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

  const deleteTask = function() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

  const taskCompleted = function() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


  const taskIncomplete = function() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

  const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', checkBoxEventHandler);
}

for (let incompleteTask of incompleteTasksChildren) {
  bindTaskEvents(incompleteTask,taskCompleted);
}

for (let completedTask of completedTasksChildren) {
  bindTaskEvents(completedTask,taskIncomplete);
}
