import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import EmployeeService from "../services/EmployeeService";
import { useFormik } from "formik";

export default function Register() {

  let employeeService = new EmployeeService();
  const employeeRegisterSchema = Yup.object().shape({
    birthDate: Yup.date().required("Date of Birth is required"),
    email: Yup.string().required("Email field is required").email("Not a valid email"),
    reEmail: Yup.string().oneOf([Yup.ref("email"),null],"Email information does not match").required("Email Repeat is required"),
    firstName: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last name is required"),
    nationalNumber: Yup.string().required("ID number is required").length(11,"ID number is incorrect").matches(/^[0-9]+$/, "Only numbers must be entered"),
    password: Yup.string().required("Password Required").min(8,"Password must be at least 8 characters long"),
    rePassword: Yup.string().oneOf([Yup.ref("password"),null], "Passwords do not match")
  });

  const history = useHistory();

  const formik= useFormik({
    initialValues: {
      birthDate:"",
      email:"",
      firstName:"",
      lastName:"",
      nationalNumber:"",
      password:"",
      rePassword:"",
    },
    validationSchema: employeeRegisterSchema,
    onSubmit:(values) => {
      console.log(values)
      employeeService.registerEmployee(values).then((result) => alert(result.data.message))
      .catch((result) => {
        console.log(result)
        alert(result.response.data.message)
      })
      history.push("/login")
    }
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName,value);
  }

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Register
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <Grid stackable>
            <Grid.Column width={8}>
            <div style={{marginTop:"1em"}}>
              <label><b>Ad</b></label>
              
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Ad"
                type="text"
                value={formik.values.firstName}
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.errors.firstName && formik.touched.firstName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.firstName}
                  </div>
                )
              }
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Surname</b></label>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Surname"
                type="text"
                value={formik.values.lastName}
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>S/V No</b></label>
              <Form.Input
                fluid
                icon="id card"
                iconPosition="left"
                placeholder="S/V No"
                type="text"
                value={formik.values.nationalNumber}
                name="nationalNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.nationalNumber && formik.touched.nationalNumber && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.nationalNumber}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Date of Birth</b></label>
              <Form.Input
                fluid
                icon="calendar times"
                iconPosition="left"
                placeholder="Date of birth"
                type="date"
                error={Boolean(formik.errors.birthDate)}
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "birthDate")
                }
                value={formik.values.birthDate}
                onBlur={formik.handleBlur}
                name="birthDate"
              />
              {formik.errors.birthDate && formik.touched.birthDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.birthDate}
                  </div>
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{marginTop:"1em"}}>
            <label><b>Email</b></label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail Address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />
              {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Email Repeat</b></label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Repeat e-mail address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="reEmail"
              />
              {formik.errors.reEmail && formik.touched.reEmail && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.reEmail}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Password</b></label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
              />
               {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Password Repeat</b></label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password Repeat"
                type="password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="rePassword"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid>

            <br/>
          <Button color="teal" fluid size="large" type="submit">
            Register
          </Button>
        </Segment>
      </Form>
      <Message info><Link to={"/registerEmployer"}><b>Log in here to open a Company account</b></Link></Message>
    </div>
  );
}
