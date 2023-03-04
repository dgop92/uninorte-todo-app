import {
  getOrderingObject,
  getURLSearchParamsFromObject,
  randomInRange,
} from "../../../common/helpers";
import { axiosClient } from "../../../lib/axios-client";
import { Todo } from "../entities/todo";
import { TodoCreateInput, TodoSearchInput } from "../schema-types";
import { ITodoRepository } from "./definitions/todo.def.repository";

export class JsonServerTodoRepository implements ITodoRepository {
  private baseUrl = "/todos";

  async create(input: TodoCreateInput): Promise<Todo> {
    const { data } = await axiosClient.post<Todo>(this.baseUrl, {
      ...input,
      completed: false,
      // is just for testing purposes
      id: randomInRange(0, 100_000),
    });
    return data;
  }

  async delete(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    await axiosClient.delete(url);
  }

  async getById(id: number): Promise<Todo> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await axiosClient.get<Todo>(url);
    return data;
  }

  async getManyBy(input: TodoSearchInput): Promise<Todo[]> {
    const titleSearchTerm = input.searchBy?.title;
    const searchBy = titleSearchTerm
      ? {
          title_like: titleSearchTerm,
        }
      : {};
    const filterBy = input.filterBy || {};
    const sortBy = getOrderingObject(input.sortBy);
    const urlSearchParams = getURLSearchParamsFromObject({
      ...searchBy,
      ...filterBy,
      ...sortBy,
    });
    const queryString = urlSearchParams.toString();

    const url = `${this.baseUrl}?${queryString}`;
    const { data } = await axiosClient.get<Todo[]>(url);
    return data;
  }
}