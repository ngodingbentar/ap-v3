import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Container, Col } from 'reactstrap';
// import { Signin } from '../components/Signin';
// import { signin } from '../actions/userActions';
import { register } from '../actions/userActions';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';

export default function Login(props) {
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
   
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        // console.log('submit')
        // console.log(values)
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Register</h1>
          <Form>
            <TextField label="Nama" name="name" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="password" name="password" type="password" />
            <TextField label="Ulangi Password" name="confirmPassword" type="password" />
            <button className="primary text-white" type="submit">
              <b>Register</b>
            </button>
          </Form>
        </div>
      )}
    </Formik>
  )
}
