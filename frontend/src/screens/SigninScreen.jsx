import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import e from 'cors';

export default function SigninScreen(props) {
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
   
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  // const [isType, setType] = useState('password');

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      // .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  })

  // const myFunction = ((e) => {
  //   console.log(isType)
  //   if (isType === "password") {
  //     setType("text")
  //   } else {
  //     setType("password")
  //   }
  // })
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={values => {
        // console.log('submit')
        // console.log(values)
        dispatch(signin(values.email, values.password));
      }}
    >
      {formik => (
        <div className="my-form">
          <h3 className="my-4 font-weight-bold .display-4">Login</h3>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {loading && <LoadingBox></LoadingBox>}
          {/* <button onClick={() => console.log('err', error)}>cek</button> */}
          <Form>
            <TextField label="Email" name="email" type="email" />
            <TextField id="myInput" label="password" name="password" type="password" />
            {/* <label>Email: </label> <br/>
            <input type="Email" name="email" className="my-input"></input> <br/>
            <label>Password: </label> <br/>
            <input type={isType} name="password" id="myInput" className="my-input"></input> <br/>
            <input type="checkbox" onClick={(e) => myFunction(e.target.checked)} />Show Password
            <br/> */}
            <button className="primary text-white" type="submit">
              <b>Login</b>
            </button>
          </Form>
          <div>
            <label />
            <div>
              Belum punya akun ?{' '}
              <Link to={`/register?redirect=${redirect}`}>
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}
