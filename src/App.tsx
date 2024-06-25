import "./App.css";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { validationSchema } from "./validationSchema";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import successIcon from "./assets/images/icon-success-check.svg";

function App() {
  const [selectedValue, setSelectedValue] = useState("");
  const [successMessageIsVisable, setSuccessMessageIsVisable] = useState(false);

  interface FormValue {
    firstName: string;
    lastName: string;
    email: string;
    queryType: string;
    checkbox: boolean;
  }

  const initialValues: FormValue = {
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    checkbox: false,
  };

  const handleSubmit = (values: FormValue) => {
    setSuccessMessageIsVisable(true);
    console.log(values);
  };

  if (successMessageIsVisable) {
    setTimeout(() => {
      setSuccessMessageIsVisable(false);
    }, 3000);
  }

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {(formik) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSelectedValue(event.target.value);
          formik.setFieldValue("queryType", event.target.value);
        };

        const controlProps = (item: string) => {
          return {
            checked: selectedValue === item,
            onChange: handleChange,
            value: item,
          };
        };

        return (
          <div className="form-container">
            <h1>Contact Us</h1>
            <Form noValidate>
              <div className="name-group">
                <label>
                  <span>
                    First Name <span className="required-sign">*</span>
                  </span>
                  <Field
                    name="firstName"
                    type="text"
                    className={
                      formik.errors.firstName && formik.touched.firstName
                        ? "error-border"
                        : ""
                    }
                  />
                  <ErrorMessage
                    className="error-message"
                    component="span"
                    name="firstName"
                  />
                </label>
                <label>
                  <span>
                    Last Name <span className="required-sign">*</span>
                  </span>
                  <Field
                    name="lastName"
                    type="text"
                    className={
                      formik.errors.firstName && formik.touched.firstName
                        ? "error-border"
                        : ""
                    }
                  />
                  <ErrorMessage
                    className="error-message"
                    component="span"
                    name="lastName"
                  />
                </label>
              </div>
              <label>
                <span>
                  Email <span className="required-sign">*</span>
                </span>
                <Field
                  name="email"
                  type="email"
                  className={`email ${
                    formik.errors.firstName && formik.touched.firstName
                      ? "error-border"
                      : ""
                  }`}
                />
                <ErrorMessage
                  className="error-message"
                  component="span"
                  name="email"
                />
              </label>
              <label>
                <span>
                  Query Type <span className="required-sign">*</span>
                </span>
                <div className="query-group">
                  <label
                    className={`${
                      formik.values.queryType === "generalEnquiry"
                        ? "radio-active"
                        : ""
                    }`}
                  >
                    <span>General Enquiry</span>

                    <Radio
                      {...controlProps("generalEnquiry")}
                      color="success"
                    />
                  </label>
                  <label
                    className={`${
                      formik.values.queryType === "supportRequest"
                        ? "radio-active"
                        : ""
                    }`}
                  >
                    <span>Support Request</span>
                    <Radio
                      {...controlProps("supportRequest")}
                      color="success"
                    />
                  </label>
                </div>
                <ErrorMessage
                  className="error-message"
                  component="span"
                  name="queryType"
                />
              </label>
              <label>
                <span>
                  Message <span className="required-sign">*</span>
                </span>
                <Field
                  component="textarea"
                  name="message"
                  className={`message ${
                    formik.errors.firstName && formik.touched.firstName
                      ? "error-border"
                      : ""
                  }`}
                />
                <ErrorMessage
                  className="error-message"
                  component="span"
                  name="message"
                />
              </label>
              <label className="checkbox-label">
                <div>
                  <Checkbox
                    onClick={(event) => {
                      const target = event.target as HTMLInputElement;
                      formik.setFieldValue("checkbox", target.checked);
                    }}
                    {...label}
                    color="success"
                  />

                  <span>
                    I consent to being contacted by the team{" "}
                    <span className="required-sign">*</span>
                  </span>
                </div>
                <ErrorMessage
                  className="error-message"
                  component="span"
                  name="checkbox"
                />
              </label>

              <button type="submit">Submit</button>
            </Form>
            <div
              className={`success-message ${
                successMessageIsVisable ? "isVisable" : ""
              }`}
            >
              <h2>
                <img src={successIcon} alt="" />
                <span>Message Sent!</span>
              </h2>
              <p>Thanks for completing the form. We'll be in touch soon!</p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default App;
