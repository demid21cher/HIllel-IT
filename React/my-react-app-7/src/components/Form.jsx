import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormSchema from './FormSchema';

const MyForm = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-black mb-6 text-center text-2xl font-bold ">
        Реєстрація
      </h2>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Дані форми:', values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Ім'я
              </label>

              <Field
                id="name"
                type="text"
                name="name"
                placeholder="Введіть ім'я"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Електронна пошта
              </label>

              <Field
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>

              <Field
                id="password"
                type="password"
                name="password"
                placeholder="Введіть пароль"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default MyForm;
