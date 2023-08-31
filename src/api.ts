import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet("/todos").reply(200, {
  todos: ["1st todo", "2nd todo", "3rd todo", "4th todo", "5th todo"],
});

export const getTodos = (): Promise<AxiosResponse<{ todos: string[] }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(axios.get("/todos"));
    }, 1000);
  });
};
