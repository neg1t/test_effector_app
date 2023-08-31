import { useStore } from "effector-react";
import { useEffect, useRef } from "react";
import {
  $todos,
  fetchTodosFx,
  todoAdd,
  todoClearError,
  todoRemove,
} from "./store";

function App() {
  const { todos, error } = useStore($todos);
  const loading = useStore(fetchTodosFx.pending);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTodosFx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        todoClearError();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onAddClickHandler = () => {
    todoClearError();
    todoAdd(inputRef.current?.value || "");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRef.current!.value = "";
    inputRef.current?.focus();
  };

  const onRemoveClickHandler = (todo: string) => () => {
    todoRemove(todo);
  };

  if (loading) {
    return <span style={{ fontSize: 32 }}>Загрузка...</span>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          gap: 10,
          marginBottom: 10,
        }}
      >
        <input ref={inputRef} />

        {error && <span style={{ color: "red" }}>{error}</span>}

        <button onClick={onAddClickHandler}>Добавить</button>
      </div>

      <div style={{ width: 200 }}>
        {todos.map((todo) => (
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            key={todo}
          >
            <span>{todo}</span>
            <button onClick={onRemoveClickHandler(todo)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
