let tasks = [];

// Функция для добавления задачи
function addTask() {
  const title = document.getElementById("taskTitle").value; // Получаем значение заголовка задачи
  const description = document.getElementById("taskDescription").value; // Получаем значение описания задачи
  if (title.trim() !== "") { // Проверяем, что заголовок не пуст
    tasks.push({ title, description, completed: false }); // Добавляем задачу в массив задач
    displayTasks(); // Отображаем обновленный список задач
    clearInput(); // Очищаем поля ввода
  } else {
    alert("Пожалуйста, введите название задачи."); // Выводим предупреждение о необходимости ввести заголовок задачи
  }
}

// Функция для отображения списка задач
function displayTasks() {
  const tasksContainer = document.getElementById("tasks"); // Получаем контейнер для задач
  tasksContainer.innerHTML = ""; // Очищаем контейнер
  tasks.forEach((task, index) => { // Проходим по всем задачам в массиве
    const taskElement = createTaskElement(task, index); // Создаем элемент задачи
    tasksContainer.appendChild(taskElement); // Добавляем элемент задачи в контейнер
  });
}


// Функция для создания элемента задачи
function createTaskElement(task, index) {
  const taskElement = document.createElement("div"); // Создаем новый элемент div для задачи
  taskElement.classList.add("task"); // Добавляем класс "task" к элементу
  if (task.completed) { // Если задача завершена
    taskElement.classList.add("completed"); // Добавляем класс "completed" к элементу
  }
  taskElement.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <button onclick="toggleTaskCompletion(${index})">${task.completed ? "Отметить как незавершенное" : "Отметить как завершенное"  }</button>
      <button onclick="deleteTask(${index})"> удалить </button>
      <span class="status ${task.completed ? "completed-word" : ""}">${task.completed ? "Завершено" : "Активный"}</span>
  `; // Вставляем HTML-разметку для заголовка, описания, кнопок и статуса задачи
  return taskElement; // Возвращаем созданный элемент задачи
}

// Функция для переключения статуса задачи (завершена/не завершена)
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed; // Меняем статус задачи
  if (tasks[index].completed) { // Если задача завершена
    alert("Задача завершена!"); // Выводим уведомление о завершении задачи
  }
  displayTasks(); // Отображаем обновленный список задач
}

// Функция для удаления задачи
function deleteTask(index) {
  const confirmDelete = confirm("Вы уверены, что хотите удалить эту задачу?"); // Запрашиваем подтверждение удаления
  if (confirmDelete) { // Если подтверждено удаление
    tasks.splice(index, 1); // Удаляем задачу из массива
    displayTasks(); // Отображаем обновленный список задач
  }
}

// Функция для очистки полей ввода
function clearInput() {
  document.getElementById("taskTitle").value = ""; // Очищаем поле ввода заголовка задачи
  document.getElementById("taskDescription").value = ""; // Очищаем поле ввода описания задачи
}

// Функция для фильтрации задач по статусу (все, активные, завершенные)
function filterTasks(filter) {
  let filteredTasks = []; // Создаем пустой массив для отфильтрованных задач
  switch (filter) { // Выполняем действия в зависимости от выбранного фильтра
    case "all": // Если выбран фильтр "все"
      filteredTasks = tasks; // Отображаем все задачи
      break;
    case "active": // Если выбран фильтр "активные"
      filteredTasks = tasks.filter((task) => !task.completed); // Отображаем только активные задачи
      break;
    case "completed": // Если выбран фильтр "завершенные"
      filteredTasks = tasks.filter((task) => task.completed); // Отображаем только завершенные задачи
      break;
    default: // По умолчанию отображаем все задачи
      filteredTasks = tasks;
      break;
  }
  displayFilteredTasks(filteredTasks); // Отображаем отфильтрованные задачи
}

// Функция для отображения отфильтрованных задач
function displayFilteredTasks(filteredTasks) {
  const tasksContainer = document.getElementById("tasks"); // Получаем контейнер для задач
  tasksContainer.innerHTML = ""; // Очищаем контейнер
  filteredTasks.forEach((task, index) => { // Проходим по отфильтрованным задачам
    const taskElement = createTaskElement(task, index); // Создаем элемент задачи
    tasksContainer.appendChild(taskElement); // Добавляем элемент задачи в контейнер
  });
}
