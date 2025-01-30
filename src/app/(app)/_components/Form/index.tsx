"use client";

import type { Form as FormType } from "@/payload-types";

import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Lexical } from "@/app/(app)/_components/Lexical";
import { Button } from "@/app/(app)/_components/Button";
import { useRouter } from "next/navigation";

import { buildInitialFormState } from "./buildInitialFormState";
import { fields } from "./fields";
import { Loader } from "lucide-react";

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[];
}

export const Form: React.FC<{
  form: FormType;
}> = (props) => {
  const {
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType = "message",
      redirect,
      submitButtonLabel,
    } = {},
  } = props;

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields ?? []),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();
  // const [files, setFiles] = useState<{ name: string; file: File | null }[]>([]);

  // const handleFileChange = (field: string, selectedFile: File | null) => {
  //   if (files.find((f) => f.name === field)) {
  //     setFiles(files.filter((f) => f.name !== field));
  //   } else {
  //     setFiles([...files, { name: field, file: selectedFile }]);
  //   }
  // };

  const onSubmit = useCallback(
    (data: Data) => {
      console.log("data", data);

      let loadingTimerID: ReturnType<typeof setTimeout>;

      const submitForm = async () => {
        setError(undefined);

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        let dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        try {
          // if (files && files.length > 0) {
          //   await Promise.all(
          //     files.map(async (fileObject) => {
          //       if (fileObject.file) {
          //         const formData = new FormData();
          //         formData.append("file", fileObject.file);

          //         try {
          //           const req = await fetch(
          //             `${process.env.NEXT_PUBLIC_SERVER_URL}/api/public-media`,
          //             {
          //               method: "POST",
          //               body: formData,
          //             },
          //           );
          //           const res = await req.json();

          //           if (req.status >= 400) {
          //             throw new Error(
          //               res.errors?.[0]?.message || "Internal Server Error",
          //             );
          //           }

          //           dataToSend = dataToSend.map((field) => {
          //             if (field.field === fileObject.name) {
          //               return {
          //                 field: fileObject.name,
          //                 value: res.doc.filename,
          //               };
          //             }
          //             return field;
          //           });
          //         } catch (error) {
          //           console.warn(error);
          //           throw new Error("Could not upload file.");
          //         }
          //       }
          //     }),
          //   );
          // }

          const req = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`,
            {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            },
          );

          const res = await req.json();

          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);

            setError({
              message: res.errors?.[0]?.message || "Internal Server Error",
              status: res.status,
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === "redirect" && redirect) {
            const { url } = redirect;

            const redirectUrl = url;

            if (redirectUrl) router.push(redirectUrl);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: "Something went wrong.",
          });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType],
  );

  return (
    <FormProvider {...formMethods}>
      {!isLoading &&
        hasSubmitted &&
        confirmationType === "message" &&
        !!confirmationMessage && <Lexical content={confirmationMessage} />}
      {isLoading && !hasSubmitted && (
        <Loader className="h-6 w-6 animate-spin" />
      )}
      {error && <div>{`${error.status || "500"}: ${error.message || ""}`}</div>}
      {!hasSubmitted && (
        <form id={formID?.toString()} onSubmit={handleSubmit(onSubmit)}>
          <h3 className="h-small">{formFromProps?.title}</h3>
          <div className="mb-4 last:mb-0">
            {formFromProps &&
              formFromProps.fields &&
              formFromProps.fields?.map((field, index) => {
                const Field: React.FC<any> | null = fields?.[field.blockType];

                if (Field) {
                  return (
                    <div className="mb-6 max-w-[40rem] last:mb-0" key={index}>
                      <Field
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    </div>
                  );
                }
                return null;
              })}
          </div>

          <Button form={formID?.toString()} type="submit" variant="default">
            {submitButtonLabel ?? "verzenden"}
          </Button>
        </form>
      )}
    </FormProvider>
  );
};
