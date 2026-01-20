import { z } from "zod";

export const TodosValidatorSchema = z.object({
  id: z.cuid(),
  title: z
    .string()
    .min(3, "minimum 3 characters required for title!")
    .max(30, "title length should be less than 30"),
  details: z
    .string()
    .min(3, "minimum 3 characters required for description!")
    .max(500, "details length should be less than 200")
    .optional(),
  isCompleted: z.boolean({ error: "isCompleted must be a boolean value" }),
  deadline: z.date().optional(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const TodosResponseValidatorSchema = TodosValidatorSchema.pick({
  id: true,
  title: true,
  details: true,
  isCompleted: true,
  deadline: true,
  createdAt: true,
  updatedAt: true,
});

export const TodosPostValidatorSchema = TodosValidatorSchema.pick({
  title: true,
  details: true,
  isCompleted: true,
  deadline: true,
});
