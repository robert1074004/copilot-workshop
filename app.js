const STORAGE_KEY = "offline-todo-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let currentFilter = "all";

const THEME_STORAGE_KEY = "offline-todo-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

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

// 套用使用者保存的主題，沒有保存值時才使用系統偏好。
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function getInitialTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || (systemThemeQuery.matches ? "dark" : "light");
}

systemThemeQuery.addEventListener("change", (event) => {
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

function getVisibleTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function updateEmptyMessage(visibleTodos) {
  if (visibleTodos.length > 0) {
    emptyMessage.hidden = true;
    return;
  }

  const messages = {
    all: "還沒有任何待辦事項,新增一個吧!",
    active: "太棒了,目前沒有未完成的待辦事項!",
    completed: "目前還沒有已完成的待辦事項。"
  };
  emptyMessage.textContent = messages[currentFilter];
  emptyMessage.hidden = false;
}

function renderTodos() {
  todoList.replaceChildren();
  const visibleTodos = getVisibleTodos();
  updateEmptyMessage(visibleTodos);

  visibleTodos.forEach((todo) => {
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

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    renderTodos();
  });
});

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

applyTheme(getInitialTheme());
renderTodos();
