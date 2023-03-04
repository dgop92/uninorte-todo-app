import { Todo } from "../../entities/todo";
import { TodoCreateInput, TodoSearchInput } from "../../schema-types";

export interface ITodoRepository {
  create(input: TodoCreateInput): Promise<Todo>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Todo>;
  getManyBy(input: TodoSearchInput): Promise<Todo[]>;
}
