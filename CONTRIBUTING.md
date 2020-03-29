# Contributing

## Run the project

#### Run the Docker container

```sh
./scripts/dev/start-mysql
```

#### Install dependencies

```sh
yarn
```

#### Go to the `app` folder

```sh
cd app
```

#### Provide the environment variables

- Ask maintainers for credentials
- Copy `.env.sample` to `.env`
- Fill the variables

#### Import the database

```sh
# Create the schemas
yarn migrate
# Import the data
yarn seed
```

#### Run the app

```sh
yarn start # only the first time
yarn dev
```

## Deploy the app

Each commit to `master` deploys the application.
