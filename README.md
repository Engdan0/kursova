### Книжковий магазин на JavaScript

Створюємо базу даних використовуючи утиліту `psql`
В командній строці прописуємо:
```
/path/to/postgre/bin/psql -U postgres
Пароль: qwerty

postgres=# CREATE DATABASE online_store;

postgres=# \q
```

Ім'я БД та логін-пароль прописуємо у `server/.env`

```
DB_HOST=localhost
DB_NAME=online_store
DB_USER=postgres
DB_PASS=1234
DB_PORT=5432
```

Переходимо в директорію `shop/server`, встановлюємо пакети, запускаємо сервер через термінал

```
cd /path/to/shop/server
npm install
npm run start-dev
```

Переходимо в директорію `shop/client.v2`, встановлюємо пакети, запускаемо кліент теж через термінал

```
cd /path/to/shop/client
npm install
npm start
```

#### Додаток

Таблиці бд будуть створені при першому запуску застосунка, але будуть порожніми. Можно імпортувати бд из файлу `database.sql`, в котрій вже є категорії, видавництва, товари, користувачі і т.д.


```
/path/to/postgre/bin/psql -U postgres online_store < /path/to/shop/database.sql
Пароль: 1234
```

Тут `postgres` — ім'я користувача БД, `1234` — пароль для доступу до БД, `online_store` — ім'я бд магазину.

---

Дамп бд `database.sql` був створений з використанням утиліти `pg_dump`

```
/path/to/postgre/bin/pg_dump -U postgres online_store > /path/to/shop/database.sql
Пароль: 1234
```

Тут `postgres` — ім'я користувача БД, `1234` — пароль для доступу до БД, `online_store` — ім'я бд магазину.

---

Дамп бд містить кілька користувачів, як звичайних, так і з правами адмінстратора

* Користувач `user@gmail.com`, пароль `qwerty`
* Користувач `admin@gmail.com`, пароль `qwerty`

