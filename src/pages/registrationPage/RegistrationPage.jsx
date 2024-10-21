import { ErrorMessage, Field, Form, Formik } from 'formik';
import s from './RegistrationPage.module.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const validation = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  email: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
});

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
    name: '',
  };

  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(register(values));
    options.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <h2 className={s.title}>Registration</h2>
          <div>
            <label htmlFor="name">
              <span className={s.form_name}> Name</span>
            </label>
            <div className={s.form_error}>
              <Field
                id="name"
                name="name"
                placeholder="Name"
                className={s.form_input}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={s.form_error_msg}
              />
            </div>
          </div>
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
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
