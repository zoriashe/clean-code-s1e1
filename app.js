const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector("#add-button");
const incompleteTaskHolder = document.querySelector("#incompleteTasks");
const completedTasksHolder = document.querySelector("#completed-tasks");
const completedTasksChildren = completedTasksHolder.children

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

  checkBox.type="checkbox";
  editInput.type="text";
  editInput.className="task";

  editButton.innerText="Edit";
  editButton.className="edit";

  deleteButton.className="delete";
  deleteButtonImg.src='./remove.svg';

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

    if(containsClass){
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}

var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let completedTask of completedTasksChildren){
    bindTaskEvents(completedTask, taskCompleted);
}

for (let incompleteTask of completedTasksChildren){
    bindTaskEvents(incompleteTask, taskIncomplete);
}
