## Лабораторно-практична робота №3  
# Розробка та тестування захищеного REST API на Node.js та Express.  
### Мета: Закріплення теоретичних знань та набуття практичних навичок з розробки, захисту та тестування серверних додатків на базі REST архітектури.
## 1.Підготовка проєкту та середовища  
Створюємо репозиторій для нашого проєкту, налаштовуємо базове Node.js-середовище та запустимо мінімальний вебсервер.  
1. Створення репозиторію на GitHub
 
* Переходжу на GitHub і створіть новий публічний репозиторій з назвою secure-api-lab.  
* При створенні репозиторію обов'язково обираємо опцію "Add .gitignore" та у шаблонах знаходимо і обираю "Node". Це необхідно, щоб випадково не завантажити у репозиторій зайві файли (зокрема, теку node_modules).
* Копіюю URL сврнр репозиторію.
2.	Клонування репозиторію та перехід у теку проєкту
   
Відкриваємо термінал (або Git Bash на Windows) і виконуємо наступні команди, підставивши URL свого репозиторію:
```
git clone https://github.com/YourUsername/secure-api-lab.git

cd secure-api-lab
```
3.	Ініціалізація Node.js проєкту 

Тепер, перебуваючи в теці secure-api-lab, ініціалізовуємо проєкт за допомогою менеджера пакетів npm. Ця команда автоматично створить файл package.json.

![ФОТО1](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/1.png)

4.	Встановлення Express Додамо у наш проєкт фреймворк Express. Він буде основою нашого сервера.

![ФОТО2](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/2.png)

Після виконання цієї команди у з’явилася директорія node_modules та файл package-lock.json.

5.	Створення базового вебсервера Створимо у кореневій теці проєкту файл server.js та додайте до нього наступний код:

![ФОТО3](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/3.png)

6. Перевірка роботи сервера

Запускаємо сервер командою в терміналі

![ФОТО4](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/4.png)

Відкриваємо браузер і переходимо за адресою http://localhost:3000. На сторінці має відобразитися текст "Hello World! The server is running.".

![ФОТО5](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/5.png)

7. Збереження результатів у Git  

Збережімо результати першого етапу, зробивши коміт та відправивши зміни на GitHub.

![ФОТО6](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/6.png)

## 2. Реалізація базового API та даних

1. Створення файлу з даними

Щоб не захаращувати основний файл сервера, створимо окремий файл для зберігання наших даних.Створимо у корені проєкту файл data.js

![ФОТО7](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/7.png)

2.	Модифікація файлу server.js

Тепер підключимо наші дані до основного файлу сервера та додамо необхідний middleware для роботи з JSON. Оновимо наш server.js:

![ФОТО8](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/8.png)

3.	Перевірка роботи ендпоінтів за допомогою Postman
   
Перезапустимо сервер

![ФОТО9](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/9.png)

* Відкриваємо Postman і перевіряємо наступні запити:
  - GET http://localhost:3000/documents: У відповідь ми повинні отримати JSON-масив із двома документами та статус 200 OK.

   ![ФОТО10](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/10.png)

  - GET http://localhost:3000/employees: У відповідь ми повинні отримати JSON-масив із двома співробітниками та статус 200 OK.

  ![ФОТО11](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/11.png)

  - POST http://localhost:3000/documents:  
    ●	Встановлюємо метод запиту на POST.  
    ●	Переходимо на вкладку Body, обираємо режим raw та тип JSON.  
    ●	Вставляємо у тіло запиту наступний JSON:  
    ```
    {
      "title": "Q3 Financial Report",
      "content": "The financial results for Q3 are positive."
    }
    ```

    ![ФОТО12](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/12.png)
    ●	Надішлімо запит. У відповідь ми повинні отримати статус 201 Created та JSON-об'єкт вашого нового документа з доданим   полем id.  
    ●	Зробімол ще раз GET запит на /documents, щоб переконатись, що новий документ додався до списку.

    ![ФОТО13](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/13.png)

1. Збереження результатів

   ![ФОТО14](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/14.png)

   Наш сервер тепер має робочі ендпоінти для отримання та створення даних. Поки що вони відкриті для всіх, але на наступному етапі ми це виправимо.

## 3. Реалізація безпеки (Аутентифікація та Авторизація)

1. Створення Middleware для аутентифікації (authMiddleware)

   ![ФОТО15](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/15.png)

2.	Створення Middleware для авторизації (adminOnlyMiddleware)

   ![ФОТО16](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/16.png)

3.	Застосування Middleware до маршрутів
   
Оновлюємо наші маршрути наступним чином:

  ![ФОТО17](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/17.png)

4.	Тестування захищених ендпоінтів
   
Перезапускаємо сервер

  ![ФОТО18](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/18.png)

* Сценарій 1 (немає доступу):
  - Зробімо GET запит на http://localhost:3000/documents без заголовків.
  - Очікуваний результат: Статус 401 Unauthorized.

  ![ФОТО19](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/19.png)
  
* Сценарій 2 (Доступ для user):
  - Очікуваний результат: Статус 401 Unauthorized.
  - Переходимо на вкладку Headers.
  - Додаємо два заголовки: X-Login зі значенням user1 та X-Password зі значенням password123.
  - Очікуваний результат: Статус 200 OK та список документів.
 
  ![ФОТО20](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/20.png)

* Cценарій 3 (Заборона доступу для user):
  - Зробімо GET запит на http://localhost:3000/employees, використовуючи ті ж самі заголовки, що і в попередньому кроці (user1).
  - Очікуваний результат: Статус 403 Forbidden.
 
  ![ФОТО21](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/21.png)

* Сценарій 4 (Доступ для admin):
  - Зробіть GET запит на http://localhost:3000/employees.
  - Змініть значення заголовків на: X-Login -> admin1, X-Password -> password123.
  - Очікуваний результат: Статус 200 OK та список співробітників.

  ![ФОТО22](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/22.png)

5.	Збереження результатів у Git

  ![ФОТО23](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/23.png)

## 4. Реалізація логування

1. Створення Middleware для логування (loggingMiddleware)

Додаємо наступний код:

  ![ФОТО24](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/24.png)

2.	Глобальне застосування Middleware

Додаємо наступний код:

  ![ФОТО25](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/25.png)

3.	Перевірка роботи логера

Відкриваємо Postman і надсилаємо будь-які 2-3 запити, які ми тестували на попередньому етапі (наприклад, успішний GET /documents та невдалий GET /employees).  

  ![ФОТО26](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/26.png)

Це підтверджує, що ваше middleware для логування успішно перехоплює та реєструє всі вхідні запити.

4.	Збереження результатів у Git Зробімо фінальний коміт перед комплексним тестуванням.

  ![ФОТО27](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/27.png)

## 5. Комплексне тестування

Перед початком тестування нам потрібно трохи розширити функціонал сервера, щоб він міг обробляти всі необхідні сценарії та повертати відповідні статуси. Ми додамо валідацію для POST-запитів та можливість видаляти документи.  
Оновимо наш маршрут POST /documents та додайте новий маршрут DELETE /documents/:id у файлі server.js:

  ![ФОТО28](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/28.png)

Проведення тестів

1.	Тестування з рядка браузера

Відкриємо браузер і перейдімо за адресою http://localhost:3000/documents. Та отримаємо очікувану помилку

  ![ФОТО29](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/29.png)

Аналіз: Відкриємо інструменти розробника (F12), перейдімо на вкладку "Network". Ми побачимо, що сервер повернув статус 401 Unauthorized. Це відбувається тому, що браузер не надсилає необхідні заголовки X-Login та X-Password.  

  ![ФОТО30](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/30.png)

2.	Тестування за допомогою Postman

  ![ФОТО31](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/31.png)

  ![ФОТО32](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/32.png)

  ![ФОТО33](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/33.png)

  ![ФОТО34](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/34.png)

  ![ФОТО35](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/35.png)

  ![ФОТО36](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/36.png)

Всі тестування пройшли очікувано

3. Тестування за допомогою Node.js скрипта

Створюю у проєкті новий файл test-client.js та додаю до нього наступний код:

```
const BASE_URL = 'http://localhost:3000';

// Дані для аутентифікації
const userCredentials = {
  'X-Login': 'user1',
  'X-Password': 'password123',
};

const adminCredentials = {
  'X-Login': 'admin1',
  'X-Password': 'password123',
};

// Функція для тестування
const runTests = async () => {
  console.log('--- Running API Tests ---');
  // Сценарій 1: Успішний запит від імені користувача
  console.log('\n[TEST 1] Getting documents as a user...');

  try {
    const response = await fetch(`${BASE_URL}/documents`, {
      method: 'GET',
      headers: userCredentials,
    });

    const data = await response.json();

    console.log('Status:', response.status);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Сценарій 2: Спроба доступу до адмін-ресурсу від імені користувача
  console.log('\n[TEST 2] Trying to get employees as a user...');

  try {
    const response = await fetch(`${BASE_URL}/employees`, {
      method: 'GET',
      headers: userCredentials,
    });

    const data = await response.json();
    console.log('Status:', response.status); // Очікуємо 403
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Сценарій 3: Успішний запит від імені адміністратора

  console.log('\n[TEST 3] Getting employees as an admin...');

  try {
    const response = await fetch(`${BASE_URL}/employees`, {
      method: 'GET',
      headers: adminCredentials,
    });

    const data = await response.json();
    console.log('Status:', response.status);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n--- Tests finished ---');
};

runTests();
```

Відкриємо новий термінал і виконаємо команду node test-client.js. Проаналізуємо вивід у консолі

  ![ФОТО37](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/37.png)
    
Після успішного проходження всіх тестів зробимо фінальний коміт.

  ![ФОТО38](https://github.com/johuirmbegytm/secure-api-lab/blob/main/images/38.png)
