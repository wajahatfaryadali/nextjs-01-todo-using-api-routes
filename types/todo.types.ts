import { TodosResponseValidatorSchema } from "@/lib/zod-validators";
import z from "zod";

export type TodoType = z.infer<typeof TodosResponseValidatorSchema>;
