import { ITodoRepository } from "./definitions/todo.def.repository";
import { JsonServerTodoRepository } from "./todo.repository";

export const todoRepository: ITodoRepository = new JsonServerTodoRepository();
