console.log('#14. JavaScript homework example file');

/*
 *
 * #1
 *
 * Функціональні Вимоги:
 * 1. Вхідні параметри:
 *  - `segment`: Рядок, який представляє сегмент шляху URL до ресурсу на API. Наприклад: `/posts` для отримання списку постів, `/posts/1` для отримання посту з ідентифікатором 1.
 *
 * 2. Запити до API:
 *  - Виконати асинхронний HTTP GET запит до `https://jsonplaceholder.typicode.com`, додавши сегмент шляху `segment` до базового URL.
 *  - Використати `fetch` для надсилання запиту.
 *
 * 3. Обробка відповідей:
 *  - У разі успішної відповіді (HTTP статус 200-299), конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (HTTP статус виходить за межі 200-299), повернути HTTP статус як індикатор помилки.
 *  - При виникненні помилки в процесі виконання запиту (наприклад, мережева помилка), логувати помилку у консоль і повертати текст помилки.
 *
 * 4. Логування:
 *  - Вивести у консоль отримані дані при успішному запиті.
 *  - Логувати помилку у консоль при її виникненні.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема асинхронних функцій (`async/await`).
 * - Належне управління помилками та виключеннями.
 * - Код має бути чистим, добре структурованим, зі зрозумілими назвами змінних та функцій.
 *
 */

async function getData(segment) {
  try {
    const response = await fetch(segment);

    if (!response.ok) {
      throw new Error(`Помилка HTTP! статус: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка при отриманні даних:', error.message);

    throw error;
  }
}

getData('https://jsonplaceholder.typicode.com/posts/1')
  .then((data) => console.log('Дані отримано:', data))
  .catch((err) => console.error('Не вдалося отримати дані:', err));

/*
 *
 * #2
 * Функціональні вимоги:
 *
 * 1. Вхідні параметри:
 *  - `segment`: Рядок, що вказує на сегмент API для виконання POST запиту (наприклад, `/posts`).
 *  - `data`: Об'єкт, який містить дані для відправки в тілі запиту.
 *
 * 2. Виконання запиту:
 *  - Виконати асинхронний HTTP POST запит до `https://jsonplaceholder.typicode.com`, додавши `segment` до URL. Використати `data` як тіло запиту.
 *  - Встановити необхідні заголовки для запиту, зокрема `Content-Type: application/json`.
 *
 * 3. Обробка відповіді:
 *  - У разі успішного отримання відповіді (HTTP статус 200-299), конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (HTTP статус виходить за межі 200-299), повернути повідомлення про помилку.
 *
 * 4. Логування:
 *  - Логувати у консоль результат або повідомлення про помилку.
 *
 * Технічні Вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема асинхронних функцій (`async/await`).
 * - Належне управління помилками та відповідями від API.
 *
 */

async function postData(segment, data) {
  try {
    const response = await fetch(segment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Помилка HTTP! статус: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Помилка при відправці даних:', error.message);
    throw error;
  }
}

const url = 'https://jsonplaceholder.typicode.com/posts';
const payload = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

postData(url, payload)
  .then((data) => console.log('Успішно відправлено:', data))
  .catch((err) => console.error('Критична помилка:', err));

/*
 *
 * #3
 *
 * Функціональні вимоги:
 *
 * 1. Вхідні параметри:
 *  - `id`: Ідентифікатор об'єкта, який потрібно оновити.
 *  - `data`: Об'єкт з даними для оновлення.
 *
 * 2. Виконання запиту:
 *  - Виконати асинхронний HTTP PUT запит до `https://jsonplaceholder.typicode.com/posts/${id}` з використанням `id` та `data`.
 *  - Встановити заголовок `Content-Type: application/json`.
 * 3. Обробка відповідей:
 *  - У разі успішної відповіді, конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (наприклад, неіснуючий ресурс або проблеми з сервером), повернути повідомлення про помилку.
 *
 * 4. Логування:
 *  - Логувати у консоль результат або повідомлення про помилку.
 *
 * Технічні Вимоги:
 * - Використання асинхронних функцій (`async/await`) для обробки HTTP запитів.
 * - Належне управління помилками та відповідями від API.
 *
 */
async function putData(url, id, data) {
  try {
    const fullUrl = `${url}/${id}`;

    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Помилка HTTP! статус: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Помилка при оновленні даних:', error.message);
    throw error;
  }
}

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
const postId = 1;
const updatedData = {
  id: 1,
  title: 'новий заголовок',
  body: 'новий контент',
  userId: 1,
};

putData(baseUrl, postId, updatedData)
  .then((data) => console.log('Успішно оновлено:', data))
  .catch((err) => console.error('Помилка:', err));

/*
 *
 * #4
 * Функціональні вимоги:
 *
 * 1. Вхідні параметри:
 *  - `id`: Ідентифікатор об'єкта, який потрібно оновити.
 *  - `data`: Об'єкт з даними для оновлення.
 *
 * 2. Виконання запиту:
 *  - Виконати асинхронний HTTP PATCH запит до `https://jsonplaceholder.typicode.com/posts/${id}` з використанням `id` та `data`.
 *  - Встановити заголовок `Content-Type: application/json`.
 *
 * 3. Обробка відповідей:
 *  - У разі успішної відповіді, конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (наприклад, неіснуючий ресурс або проблеми з сервером), повернути повідомлення про помилку.
 *
 * 4. Логування:
 *  - Логувати у консоль результат або повідомлення про помилку.
 *
 * Технічні Вимоги:
 * - Використання асинхронних функцій (`async/await`) для обробки HTTP запитів.
 * - Належне управління помилками та відповідями від API.
 *
 */

async function patchData(url, id, data) {
  try {
    const fullUrl = `${url}/${id}`;

    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Помилка HTTP! статус: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Помилка при частковому оновленні даних:', error.message);
    throw error;
  }
}

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
const postId = 1;

const partialData = {
  title: 'Оновлений заголовок (PATCH)',
};

patchData(baseUrl, postId, partialData)
  .then((data) => console.log('Успішно оновлено (PATCH):', data))
  .catch((err) => console.error('Помилка:', err));

/*
 *
 * #5
 * Функціональні вимоги:
 *
 * 1. Вхідні дані:
 *  - Функція приймає один параметр id — ідентифікатор ресурсу, який потрібно видалити.
 *
 * 2. Запит на видалення:
 *  - Виконати асинхронний HTTP DELETE запит до API за адресою https://jsonplaceholder.typicode.com/posts/${id}, де ${id} замінюється на конкретний ідентифікатор ресурсу для видалення.
 *
 * 3. Обробка відповіді:
 *  - Якщо запит успішний (HTTP статус відповіді 200-299), логувати успішне повідомлення і повертати true.
 *  - У випадку отримання відповіді зі статусом, що вказує на помилку (все, що поза діапазоном 200-299), логувати помилку зі статусом і повертати сам статус помилки.
 *  - При виникненні помилки в процесі виконання запиту (наприклад, мережева помилка), логувати повідомлення про помилку і повертати текст помилки.
 *
 * 4. Логування:
 *  - Успішне видалення: Логувати повідомлення у консоль у форматі: "Post with id [id] has been successfully deleted.", де [id] — це ідентифікатор видаленого ресурсу.
 *  - Неуспішне видалення: Логувати повідомлення у консоль у форматі: "Failed to delete post with id [id]. Status: [status]", де [id] — ідентифікатор ресурсу, а [status] — HTTP статус відповіді.
 *  - Помилка виконання запиту: Логувати повідомлення у консоль у форматі: "Error during deletion: [error message]", де [error message] — текст помилки.
 *
 * Технічні вимоги:
 * - Використання асинхронних функцій (async/await) для обробки HTTP запитів.
 * - Забезпечити належну обробку помилок та відповідей від API.
 * - Функція повинна бути експортована для подальшого використання або тестування.
 *
 */

async function deleteData(url, id) {
  try {
    const fullUrl = `${url}/${id}`;

    const response = await fetch(fullUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Не вдалося видалити пост з id ${id}. Статус: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Помилка при видаленні: ${error.message}`);
    throw error;
  }
}

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
const postId = 1;

deleteData(baseUrl, postId)
  .then((data) =>
    console.log(`Пост з id ${postId} було успішно видалено.`, data)
  )
  .catch((err) => console.error('Критична помилка:', err));

// export { getData, postData, putData, patchData, deleteData };
