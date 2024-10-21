import { ErrorMessage, Field, Form, Formik } from 'formik';
import s from './LoginPage.module.css';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

const validation = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(login(values));
    options.resetForm();
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <h2 className={s.title}>Sign In</h2>
          <div>
            <label htmlFor="email">
              <span className={s.form_name}> Email</span>
            </label>
            <div className={s.form_error}>
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className={s.form_input}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={s.form_error_msg}
              />
            </div>
          </div>

          <div>
            <label htmlFor="number">
              <span className={s.form_name}>Password</span>
            </label>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              className={s.form_input}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.form_error_msg}
            />
          </div>

          <button type="submit" className={s.form_btn}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
