import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormSchema from './FormSchema';

const MyForm = () => (
  <Formik
    initialValues={{ name: '', email: '', password: '' }}
    validationSchema={FormSchema}
    onSubmit={(values, { setSubmitting }) => {
      console.log('Дані форми:', values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="name" placeholder="Ім'я" />
        <ErrorMessage name="name" component="div" />

        <Field type="email" name="email" placeholder="Електронна пошта" />
        <ErrorMessage name="email" component="div" />

        <Field type="password" name="password" placeholder="Пароль" />
        <ErrorMessage name="password" component="div" />

        <button type="submit" disabled={isSubmitting}>
          Зареєструватися
        </button>
      </Form>
    )}
  </Formik>
);

export default MyForm;
