import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import * as Yup from "yup";
import EmployerService from "../services/EmployerService";

export default function RegisterEmployer() {
  let employerService = new EmployerService();
  const employerRegisterSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("This cell cannot be left blank!")
      .min(2, "Company name must be at least 2 characters long"),
    phoneNumber: Yup.string()
      .required("This cell cannot be left blank!")
      .length(10, "There is an error in the telephone number! Enter without '0'!")
      .matches(/^[0-9]+$/, "Just enter the number!"),
    password: Yup.string()
      .required("This cell cannot be left blank!")
      .min(8, "Password must be at least 8 characters long"),
    rePassword: Yup.string()
      .required("This cell cannot be left blank!")
      .oneOf([Yup.ref("password"), null], "Passwords are not the same!"),
    webSite: Yup.string()
      .required("This cell cannot be left blank!")
      .test("Enter without Http!", function () {
        let site = this.parent["webSite"];
        if (site) {
          return site.startsWith("http") ? false : true;
        }
      }),
    email: Yup.string()
      .required("This cell cannot be left blank!")
      .email("Enter the correct email address!")
      .test("Email domain and website domain must be the same", function () {
        let site = this.parent["webSite"];
        let email = this.parent["email"];
        if (site && email) {
          return email.endsWith(site) ? true : false;
        }
      }),
    reEmail: Yup.string()
      .required("This cell cannot be left blank!")
      .oneOf(
        [Yup.ref("email"), null],
        "Email addresses are not the same!"
      ),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      password: "",
      rePassword: "",
      webSite: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: employerRegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      employerService
        .registerEmployer(values)
        .then((result) => alert(result.message));
      history.push("/login");
    },
  });

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Company Hesab
        Qeydiyyatı
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div style={{ marginTop: "1em" }}>
            <label>
              <b>Company Name</b>
            </label>
            <Form.Input
              fluid
              icon="building"
              iconPosition="left"
              placeholder="Company Name"
              type="text"
              value={formik.values.companyName}
              name="companyName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.companyName && formik.touched.companyName && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.companyName}
              </div>
            )}
          </div>
          <Grid stackable>
            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Telephone number</b> (Write without zero)
                </label>
                <Form.Input
                  fluid
                  icon="phone"
                  iconPosition="left"
                  placeholder="Telephone number"
                  type="text"
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Email</b> (Must have the same domain as the website domain)
                </label>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Password</b>
                </label>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Website</b> (Enter without http://!)
                </label>
                <Form.Input
                  fluid
                  icon="world"
                  iconPosition="left"
                  placeholder="Website"
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
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Email Repeat</b>
                </label>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail Address Repeat"
                  type="email"
                  name="reEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.reEmail && formik.touched.reEmail && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.reEmail}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Password Repeat</b>
                </label>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password Repeat"
                  type="password"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid>

          <br />
          <Button color="teal" fluid size="large" type="submit">
          Register
          </Button>
        </Segment>
      </Form>
      <Message error>
      Attention! After Company Accounts registration is approved by Admin
         then activated!
      </Message>
    </div>
  );
}
