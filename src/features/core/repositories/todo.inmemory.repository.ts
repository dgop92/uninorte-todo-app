import { randomInRange } from "../../../common/helpers";
import { Todo } from "../entities/todo";
import { TodoCreateInput, TodoSearchInput } from "../schema-types";
import { ITodoRepository } from "./definitions/todo.def.repository";

function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const DEFAULT_TODOS: Todo[] = [
  {
    id: 1,
    title: "This is my first task",
    completed: false,
    createdAt: new Date(),
    dueDate: new Date("2023-03-24T01:32:53.104Z"),
  },
  {
    id: 2,
    title: "This is my second task",
    completed: false,
    createdAt: new Date("2023-01-04T01:32:53.104Z"),
    dueDate: new Date("2023-02-15T01:32:53.104Z"),
  },
  {
    id: 3,
    title: "Our unknown title",
    completed: true,
    createdAt: new Date("2023-02-04T01:32:53.104Z"),
    dueDate: new Date("2023-05-24T01:32:53.104Z"),
  },
];

export class InMemoryTodoRepository implements ITodoRepository {
  private static TODOS: Todo[] = DEFAULT_TODOS;

  async create(input: TodoCreateInput): Promise<Todo> {
    const todo: Todo = {
      // is just for testing purposes
      id: randomInRange(1, 100_000),
      title: input.title,
      completed: false,
      createdAt: new Date(),
      dueDate: input.dueDate,
    };
    InMemoryTodoRepository.TODOS.push(todo);
    console.log("created todo");
    await sleep(1000);
    return Promise.resolve(todo);
  }

  async changeTodoStatus(currentTodo: Todo): Promise<Todo> {
    const todo = InMemoryTodoRepository.TODOS.find(
      (t) => t.id === currentTodo.id
    );
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.completed = !todo.completed;
    console.log("changed todo status");
    await sleep(1000);
    return Promise.resolve(todo);
  }

  async delete(id: number): Promise<void> {
    InMemoryTodoRepository.TODOS = InMemoryTodoRepository.TODOS.filter(
      (t) => t.id !== id
    );
    console.log("deleted todo");
    await sleep(1000);
    return Promise.resolve();
  }

  async getById(id: number): Promise<Todo> {
    const todo = InMemoryTodoRepository.TODOS.find((t) => t.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    console.log("got todo by id");
    await sleep(1000);
    return Promise.resolve(todo);
  }

  async getManyBy(input: TodoSearchInput): Promise<Todo[]> {
    const titleSearchTerm = input.searchBy?.title;
    const completed = input.filterBy?.completed;
    const sortByCreatedAt = input.sortBy?.createdAt;
    const sortByDueDate = input.sortBy?.dueDate;

    let todos = InMemoryTodoRepository.TODOS;

    if (titleSearchTerm) {
      todos = todos.filter((t) => t.title.includes(titleSearchTerm));
    }

    if (completed !== undefined) {
      todos = todos.filter((t) => t.completed === completed);
    }

    if (sortByCreatedAt) {
      todos = todos.sort((a, b) => {
        if (sortByCreatedAt === "asc") {
          return a.createdAt.getTime() - b.createdAt.getTime();
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }

    if (sortByDueDate) {
      todos = todos.sort((a, b) => {
        if (sortByDueDate === "asc") {
          return a.dueDate.getTime() - b.dueDate.getTime();
        }
        return b.dueDate.getTime() - a.dueDate.getTime();
      });
    }
    console.log("got many todos");
    await sleep(1000);
    // throw new Error("Something went wrong");
    return Promise.resolve(todos);
  }
}
