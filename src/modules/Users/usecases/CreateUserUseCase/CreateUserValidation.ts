import { z } from "zod";

const createuserSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Campo name tem que ser do tipo string",
      required_error: "Campo name é obrigatório",
    })
    .nonempty({ message: "Campo name não pode ser uma string vazia" }),
  email: z
    .string({
      invalid_type_error: "Campo email tem que ser do tipo string",
      required_error: "Campo email é obrigatório",
    })
    .nonempty({ message: "Campo email não pode ser uma string vazia" }),
  password: z
    .string({
      invalid_type_error: "Campo email tem que ser do tipo string",
      required_error: "Campo email é obrigatório",
    })
    .min(8, { message: "Senha deve conter 8 ou mais caracteres" }),
  phone: z
    .string({
      invalid_type_error: "Campo phone tem que ser do tipo string",
      required_error: "Campo phone é obrigatório",
    })
    .nonempty({ message: "Campo phone não pode ser uma string vazia" })
    .optional(),
});

export class CreateUserValidation {
  static validate(
    data: z.infer<typeof createuserSchema>
  ): z.infer<typeof createuserSchema> {
    const validateData = createuserSchema.safeParse(data);

    if (!validateData.success) {
      throw new Error(validateData.error.errors[0].message);
    }

    return data;
  }
}
