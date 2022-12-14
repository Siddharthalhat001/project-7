import React from "react";
import { useSelector } from "react-redux";
import EmployerService from "../../../services/EmployerService";
import { Card, Grid, Form, Button, Message } from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function EmployerUpdate() {
  let employerService = new EmployerService();
  const { authItem } = useSelector((state) => state.auth);

  let [employer, setEmployer] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getEmployerById(authItem[0].user.id).then((result) => {
      setEmployer(result.data.data);
    });
  }, [authItem]);

  const employerUpdateShema = Yup.object().shape({
    companyName: Yup.string()
      .required("This field cannot be left blank")
      .min(2, "Must be at least 2 characters long"),
    email: Yup.string()
      .required("This field is required")
      .email("You entered an incorrect email"),
    phoneNumber: Yup.string()
      .required("This field is required")
      .min(11, "Phone number must be 11 digits")
      .max(11, "Phone number must be 11 digits"),
    webSite: Yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      phoneNumber: "",
      webSite: "",
    },
    validationSchema: employerUpdateShema,
    onSubmit: (values) => {
      formik.values.employerId = authItem[0].user.id;
      employerService
        .update(values)
        .then((result) => {
          alert(result.data.message);
        })
        .catch((result) => {
          alert(result.response.data.message);
        });
    },
  });

  return (
    <div>
      {/* {(formik.values.companyName=employer.companyName)} */}
      {employer.waitingUpdate === true && (
        <Message positive>
          <Message.Header>
          Your last update request is awaiting approval
          </Message.Header>
          <p>
          You cannot make a new update until your latest update request is approved, our staff will approve your request as soon as possible.
          </p>
        </Message>
      )}
      {employer.waitingUpdate === false && (
        <Card fluid color={"black"}>
          <Card.Content header={"Update Company Information"} />
          <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
              <Grid>
                <Grid.Column width={8}>
                  <div>
                    <label>
                      <b>Company name</b>
                    </label>
                    <Form.Input
                      fluid
                      placeholder="Company name"
                      type="text"
                      name="companyName"
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.companyName &&
                      formik.touched.companyName && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.companyName}
                        </div>
                      )}
                  </div>
                  <label>
                    <b>Email</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Company name"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.email}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <div>
                    <label>
                      <b>Web Site</b>
                    </label>
                    <Form.Input
                      fluid
                      placeholder="Web Sites"
                      type="text"
                      name="webSite"
                      value={formik.values.webSite}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.webSite && formik.touched.webSite && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.webSite}
                      </div>
                    )}
                  </div>
                  <label>
                    <b>Telephone</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Telephone"
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
              <div style={{ marginTop: "1em" }}>
                <Button fluid color="green" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}
