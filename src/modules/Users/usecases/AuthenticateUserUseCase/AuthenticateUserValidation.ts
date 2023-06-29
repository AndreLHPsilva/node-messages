import { z } from "zod";

const authenticateuserSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Campo email tem que ser do tipo string",
      required_error: "Campo email é obrigatório",
    })
    .nonempty({ message: "Campo email não pode ser uma string vazia" }),
  password: z
    .string({
      invalid_type_error: "Campo password tem que ser do tipo string",
      required_error: "Campo password é obrigatório",
    })
    .min(8, { message: "Senha deve conter 8 ou mais caracteres" }),
});

export class AuthenticateUserValidation {
  static validate(
    data: z.infer<typeof authenticateuserSchema>
  ): z.infer<typeof authenticateuserSchema> {
    const validateData = authenticateuserSchema.safeParse(data);

    if (!validateData.success) {
      throw new Error(validateData.error.errors[0].message);
    }

    return data;
  }
}
