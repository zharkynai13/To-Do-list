const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//Добавления задачи
form.addEventListener("submit", addTask);


// удаления задачи 
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершенной
 tasksList.addEventListener('click' , doneTask);


//Функции
function addTask (event) {
  event.preventDefault();

  //достаем текст задачи из поля ввода
  const taskText = taskInput.value;

  //Формруем разметку для новой задачи
  const taskHTML = `
        <li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
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

// Скырываем поля задач после дабавки задачи
  if(tasksList.children.length > 1) {
    emptyList.classList.add('none');
  } 
}


function deleteTask(event) {
  if(event.target.dataset.action === 'delete') {
   const parentNode = event.target.closest('li');
  parentNode.remove();

 }

 // Проверка если в списке задач более 1-инэлемент показываем блок "Список задач пуст"
 if(tasksList.children.length === 1) {
  emptyList.classList.remove('none');
 }
}

function doneTask(event) {
  if(event.target.dataset.action === 'done')  {
    const parentNode = event.target.closest('li');

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    console.log(taskTitle);

  }

}

