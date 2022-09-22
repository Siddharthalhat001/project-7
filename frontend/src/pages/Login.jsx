import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'
import UserService from "../services/UserService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/actions/authActions";
import { toast } from "react-toastify";

export default function Login() {

  const dispatch = useDispatch()

  const handleLogin=(user)=>{
    dispatch(userLogin(user))
  }

  const history = useHistory();

  let userService = new UserService();
  const userLoginSchema = Yup.object().shape({
    email: Yup.string().required("This field must be filled").email("Please enter a valid email address"),
    password: Yup.string().required("This field must be filled")
  })

  const formik = useFormik({
    initialValues: {
      email:"",
      password:""
    },
    validationSchema: userLoginSchema,
    onSubmit:(values) => {
      userService.login(values).then((result) => {
        handleLogin(result.data.data)
        history.push("/")
      }).catch((result) => {
        toast.info(result.response.data.message)
        alert(result.response.data.message)
      })
    }
  })

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Enter
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div>
          <label><b>Email</b></label>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.errors.email && formik.touched.email && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.email}
              </div>
            )
          }
          </div>
          <div style={{marginTop:"1em"}}>
          <label><b>Password</b></label>
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
          {
            formik.errors.password && formik.touched.password && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.password}
              </div>
            )
          }
          </div>

          <Button color="teal" fluid size="large" type="submit" style={{marginTop:"1em"}}>
            Enter
          </Button>
        </Segment>
      </Form>
      <Message info>
        You don't have an account? <b><Link to={"/register"}>Register!</Link></b>
      </Message>
    </div>
  );
}
