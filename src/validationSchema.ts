import { boolean, object, string } from "yup";

export const validationSchema: object = object({
  firstName: string().required("This field is required"),
  lastName: string().required("This field is required"),
  email: string()
    .required("This field is required")
    .matches(/^\S+@\S+\.\S+$/, "Please enter a valid email address"),
  message: string()
    .required("This field is required")
    .min(15, "Minimum length is 15 characters"),
  queryType: string().required("Please select a query type"),
  checkbox: boolean().oneOf(
    [true],
    "To submit this form, please consent to being contacted"
  ),
});
