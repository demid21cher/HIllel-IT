import { object, string } from 'yup';

const FormSchema = object().shape({
  name: string()
    .min(2, "Занадто коротке ім'я")
    .max(50, "Занадто довге ім'я")
    .required("Обов'язкове поле"),

  email: string()
    .email('Неправильний формат електронної пошти')
    .required("Обов'язкове поле"),

  password: string()
    .min(8, 'Пароль повинен містити мінімум 8 символів')
    .required("Обов'язкове поле"),
});

export default FormSchema;
