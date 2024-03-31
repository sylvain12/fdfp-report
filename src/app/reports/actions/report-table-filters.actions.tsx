import { ZodError, string, z } from "zod";

const schema = z.object({
  year: z.string(),
  table: z.string(),
});

export type Fields = {
  year: string;
  table: string;
};

export type FormState = {
  message: string;
  errors: Record<keyof Fields, string> | undefined;
  fieldValues: Fields;
};

export async function submitFormAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const year = formData.get("year") as string;
  const table = formData.get("table") as string;

  try {
    schema.parse({
      year,
      table,
    });
    return {
      message: "success",
      errors: undefined,
      fieldValues: {
        year,
        table,
      },
    };
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "error",
      errors: {
        year: errorMap["year"]?.[0] ?? "",
        table: errorMap["table"]?.[0] ?? "",
      },
      fieldValues: {
        year: "",
        table: "",
      },
    };
  }
}
