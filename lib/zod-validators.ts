import { UserRoleEnum } from "@/app/generated/prisma/enums";
import { z } from "zod";

export const TodosValidatorSchema = z.object({
  id: z.cuid(),
  title: z
    .string("title cannot be empty")
    .min(3, "minimum 3 characters required for title!")
    .max(30, "title length should be less than 30"),
  details: z
    .string("details cannot be empty")
    .min(3, "minimum 3 characters required for description!")
    .max(500, "details length should be less than 200")
    .optional(),
  isCompleted: z.boolean({ error: "isCompleted must be a boolean value" }),
  deadline: z.date().optional(),
  // isDeleted: z.boolean().optional(),
  // deletedAt: z.date().optional(),
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

// user schemas

export const UsersValidatorSchema = z.object({
  id: z.cuid(),
  name: z
    .string("name is required")
    .min(3, "name cannot be less than 3 characters")
    .max(100, "name cannot be more than 100 characters"),
  identifier: z.email("email is required"),
  password: z
    .string("password is required")
    .min(6, "minimum 6 charaters req for password")
    .max(50, "max 50 characters allowed in password field"),
  isActive: z.boolean().optional().default(false),
  role: z
    .enum(["user", "admin"], { error: "role can be admin or user" })
    .optional()
    .default(UserRoleEnum.USER),
  imageURL: z
    .string("imageURL cannot be empty")
    .max(100, "url cannot be empty")
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateUserValidatorSchema = UsersValidatorSchema.pick({
  name: true,
  identifier: true,
  password: true,
  isActive: true,
  role: true,
  imageURL: true,
});

export const UsersResponseValidatorSchema = UsersValidatorSchema.pick({
  id: true,
  name: true,
  identifier: true,
  isActive: true,
  role: true,
  imageURL: true,
});


// auth validator

export const RegisterPayloadValidatorSchema = UsersValidatorSchema.pick({
  identifier: true,
  password: true,
});

export const LoginPayloadValidatorSchema = UsersValidatorSchema.pick({
  identifier: true,
  password: true,
});