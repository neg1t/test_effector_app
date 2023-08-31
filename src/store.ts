import { createStore, createEffect, createEvent } from "effector";
import { getTodos } from "./api";

interface TodoStore {
  todos: string[];
  error: string;
}

const initialState: TodoStore = {
  todos: [],
  error: "",
};

export const fetchTodosFx = createEffect<void, string[]>(
  async () => await (await getTodos()).data.todos
);

export const todoAdd = createEvent<string>();
export const todoRemove = createEvent<string>();
export const todoClearError = createEvent();

export const $todos = createStore<TodoStore>(initialState)
  .on(fetchTodosFx.doneData, (state, todos) => ({ ...state, todos }))
  .on(todoAdd, (state, todo) => {
    if (state.todos.includes(todo)) {
      return { ...state, error: "Такая задача уже есть" };
    }
    return { ...state, todos: [...state.todos, todo] };
  })
  .on(todoRemove, (state, todo) => ({
    ...state,
    todos: state.todos.filter((t) => t !== todo),
  }))
  .on(todoClearError, (state) => ({ ...state, error: "" }));
