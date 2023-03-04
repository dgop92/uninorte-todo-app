import { Todo } from "../../entities/todo";

export const TEST_TODOS: Record<string, Todo> = {
  todo1: {
    id: 1,
    title: "This is my first task",
    completed: false,
    createdAt: new Date(),
    dueDate: new Date("2023-03-24T01:32:53.104Z"),
  },
  todo2: {
    id: 2,
    title: "This is my second task",
    completed: false,
    createdAt: new Date("2023-01-04T01:32:53.104Z"),
    dueDate: new Date("2023-02-15T01:32:53.104Z"),
  },
  todo3: {
    id: 3,
    title: "Our unknown title",
    completed: true,
    createdAt: new Date("2023-02-04T01:32:53.104Z"),
    dueDate: new Date("2023-05-24T01:32:53.104Z"),
  },
};
