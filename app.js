const STORAGE_KEY = "offline-todo-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");

let todos = loadTodos();

// 從瀏覽器的 localStorage 讀取既有待辦，資料損壞時回傳空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

// 將目前清單保存到瀏覽器，讓重新整理後仍能保留資料。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.replaceChildren();
  emptyMessage.hidden = todos.length > 0;

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("is-completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成待辦：${todo.text}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除待辦：${todo.text}`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemToKeep) => itemToKeep.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${unfinishedCount} 項`;
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text,
    completed: false
  });

  saveTodos();
  renderTodos();
  todoForm.reset();
  todoInput.focus();
});

renderTodos();
