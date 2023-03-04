/* eslint-disable prefer-destructuring */
import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import axios from "axios";
import { axiosClient } from "../../../../lib/axios-client";
import { Todo } from "../../entities/todo";
import { todoRepository } from "../../repositories/repository-factory";
import { TEST_TODOS } from "./test-data";

axios.defaults.adapter = require("axios/lib/adapters/http");

async function deleteAllTodos() {
  const { data: todos } = await axiosClient.get<Todo[]>("/todos");
  const promises = todos.map((todo) => todoRepository.delete(todo.id));
  // delete all todos
  await Promise.all(promises);
}

describe("todo repository", () => {
  beforeAll(async () => {
    await deleteAllTodos();
  });

  describe("Create", () => {
    beforeAll(async () => {
      await deleteAllTodos();
    });

    it("should create a todo", async () => {
      const todo = await todoRepository.create({
        title: "test todo",
        dueDate: new Date("2023-09-14T01:32:53.104Z"),
      });
      const retrievedTodo = await todoRepository.getById(todo.id);
      expect(retrievedTodo.title).toBe("test todo");
      expect(retrievedTodo.completed).toBe(false);
    });
  });

  describe("Delete", () => {
    let todo1: Todo;

    beforeAll(async () => {
      await deleteAllTodos();
    });

    beforeEach(async () => {
      todo1 = await todoRepository.create({
        title: "test todo",
        dueDate: new Date("2023-09-14T01:32:53.104Z"),
      });
    });

    it("should delete a todo", async () => {
      await todoRepository.delete(todo1.id);
      try {
        await todoRepository.getById(todo1.id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toContain("404");
        }
      }
    });
  });

  describe("Get Many By", () => {
    beforeAll(async () => {
      await deleteAllTodos();

      await axiosClient.post("/todos", TEST_TODOS.todo1);
      await axiosClient.post("/todos", TEST_TODOS.todo2);
      await axiosClient.post("/todos", TEST_TODOS.todo3);
    });

    it("should get all todos", async () => {
      const todos = await todoRepository.getManyBy({});
      expect(todos).toHaveLength(3);
    });
    it("should get all completed todos", async () => {
      const todos = await todoRepository.getManyBy({
        filterBy: { completed: true },
      });
      expect(todos).toHaveLength(1);
    });
    it("should get all todos with title that contain 'unknown'", async () => {
      const todos = await todoRepository.getManyBy({
        searchBy: { title: "unknown" },
      });
      expect(todos).toHaveLength(1);
      expect(todos[0].title).toBe(TEST_TODOS.todo3.title);
    });
  });
});
