const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

checkEmptyList();

//Добавления задачи
form.addEventListener("submit", addTask);


tasksList.addEventListener('click', deleteTask);
 
 tasksList.addEventListener('click' , doneTask);


function addTask (event) {
  event.preventDefault();

  //достаем текст задачи из поля ввода
  const taskText = taskInput.value;


//Cохрянаем данные на localStorage
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
   };

   tasks.push(newTask);
   
   const cssClass = newTask.done ? "task-title task-title--done": "task-title";


  //Формруем разметку для новой задачи
  const taskHTML = `
        <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;
  // добавляем на страницу 
  
  tasksList.insertAdjacentHTML('beforeend' , taskHTML);


  //щчишаем поля ввода
  taskInput.value = '';
  taskInput.focus();
  
checkEmptyList();



}


function deleteTask(event) {
  if(event.target.dataset.action === 'delete') {
   const parentNode = event.target.closest('li');


   // определяем iD задачи 
   const id = Number(parentNode.id);
   
   // находим индекс задачи массиве 
   const index =tasks.findIndex(function (task) {
    if(task.id === id) {
      return true;
    }
   });


  // удаляем задачу из массива задачами 
   tasks.splice(index, 1);

  // удаляем задачу из разметки 
  parentNode.remove();

 }

 // Проверка если в списке задач более 1-инэлемент показываем блок "Список задач пуст"
 if(tasksList.children.length === 1) {
  emptyList.classList.remove("none");
 }

 checkEmptyList();
}

function doneTask(event) {
  if(event.target.dataset.action === 'done')  {
    const parentNode = event.target.closest('li');

//определяем pflfxb 
    const id = Number(parentNode.id);
    
   const task = tasks.find(function(task) {
      if (task.id === id) {
        return true;
      }
    });
    task.done = !task.done;


    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

  }

}

function checkEmptyList () {
  if (tasks.length === 0) {
    const emptyListHTML = `
      <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;

        tasksList.insertAdjacentHTML('afterbegin' , emptyListHTML);

  }

  if(tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null ;
  }

}

  


