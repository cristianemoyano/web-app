# web-app
App with Docker Compose, Django, and Create React App

## Development

### Build
Build project.

```bash
$ make build
```

### Run
Run frontend & backend containers.

```bash
$ make up
```

### React

Visit:

http://localhost:3000/login

### Django

Create an optimized production build: It's required the first time or when the frontend has changed. Otherwise, it's optional.

```bash
$ make front-build
```

Visit:

http://localhost:8000/


## Production container

### Build and test your image

```bash
$ make prod-build
```

### Run your image as a container in background

```bash
$ make prod-up
```

Visit http://localhost:8000/

### Shell into the container

```bash
make prod-shell
```

### Stop containers

```bash
make stop
```
