import { ITodoRepository } from "./definitions/todo.def.repository";
import { JsonServerTodoRepository } from "./todo.json.repository";
import { InMemoryTodoRepository } from "./todo.inmemory.repository";

type RepositoryOptions = "JsonServer" | "InMemory";

function getRepository(name: RepositoryOptions): ITodoRepository {
  if (name === "JsonServer") {
    return new JsonServerTodoRepository();
  }
  if (name === "InMemory") {
    return new InMemoryTodoRepository();
  }
  throw new Error("Repository not found");
}

export const todoRepository: ITodoRepository = getRepository(
  import.meta.env.VITE_REPOSITORY_NAME
);
