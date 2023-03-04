import Joi from "joi";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date;
  createdAt: Date;
}

export const TodoCreateInputSchema = Joi.object({
  title: Joi.string().max(120).required(),
  dueDate: Joi.date().required(),
}).meta({ className: "TodoCreateInput" });

export const TodoSearchInputSchema = Joi.object({
  searchBy: Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().optional(),
  }).optional(),
  filterBy: Joi.object({
    completed: Joi.boolean().optional(),
  }).optional(),
  sortBy: Joi.object({
    createdAt: Joi.string().valid("asc", "desc").optional(),
    dueDate: Joi.string().valid("asc", "desc").optional(),
  }).optional(),
}).meta({ className: "TodoSearchInput" });
