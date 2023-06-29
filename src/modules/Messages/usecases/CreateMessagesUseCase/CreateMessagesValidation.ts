import { z } from "zod";

const createmessagesSchema = z.object({
  message: z
    .string({
      invalid_type_error: "Campo message deve ser do tipo string",
      required_error: "Campo message é obrigatório",
    })
    .nonempty({ message: "Campo message não pode ser uma string vazia." }),

  receiver_id: z
    .string({
      invalid_type_error: "Campo receiver_id deve ser do tipo string",
      required_error: "Campo receiver_id é obrigatório",
    })
    .nonempty({ message: "Campo receiver_id não pode ser uma string vazia." }),
});

export class CreateMessagesValidation {
  static validate(
    data: z.infer<typeof createmessagesSchema>
  ): z.infer<typeof createmessagesSchema> {
    const validateData = createmessagesSchema.safeParse(data);

    if (!validateData.success) {
      throw new Error(validateData.error.errors[0].message);
    }

    return data;
  }
}
