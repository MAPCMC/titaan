import type { Form } from "@/payload-types";
export const buildInitialFormState = (fields: Form["fields"]) => {
  const initial = fields?.reduce((initialSchema, field) => {
    if (field.blockType === "hidden") {
      return {
        ...initialSchema,
        [field.name]: "",
      };
    }
    if (field.blockType === "checkbox") {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue ?? false,
      };
    }
    if (field.blockType === "text") {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue ?? "",
      };
    }
    if (field.blockType === "textarea") {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue ?? "",
      };
    }
    if (field.blockType === "select") {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue ?? "",
      };
    }

    return initialSchema;
  }, {});

  return initial;
};
