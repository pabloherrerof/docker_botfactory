
# Bot Factory

Proyecto elaborado con Laravel, Nextjs, MySQL para la gestión de clientes de los distintos usuarios. En la carpeta api encontraremos la API REST desarrollada con Laravel y en la carpeta ui el front elaborado con Nextjs, usando distintas librerias como Zustand, StyledComponents, Framer-motion, React-scroll,... 




## Run Locally

Clone the project

```bash
git clone https://github.com/pabloherrerof/docker_botfactory.git
```

Go to the project directory

```bash
cd docker_botfactory/api
```

Composer install
```bash
composer install
```

Run docker
```bash
./vendor/bin/sail up
```

Run migrations on /api directory
```bash
./vendor/bin/sail php artisan migrate
```

Run database seeders on /api directory
```bash
./vendor/bin/sail php artisan db:seed
```

Run storage link on /api directory
```bash
./vendor/bin/sail php artisan storage:link
```

User credentials:

  - username: user1@botfactory.com
  - password: password1

  - username: user2@botfactory.com
  - password: password2

  - username: user3@botfactory.com
  - password: password3


## Authors

- [@pabloherrerof](https://github.com/pabloherrerof)

# docker_botfactory
