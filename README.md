# Timely

Little complicated todo list app with a focus on time management.
Goal is to help you manage your tasks as well as analyze your time usage by history in-depth analysis.

# Structure
This project is structured as a monorepo using [Nx](https://nx.dev). It contains the following applications and libraries:
- ✨ **apps/api**: The backend API for the todo list application, built with Nestjs.
- ✨ **apps/todo-list**: The main application for managing todo lists, built with React.
- ✨ **apps/timer**: A timer application for tracking time spent on tasks, built with React.
- ✨ **apps/records**: An application for managing and analyzing time records, built with Angular.

Communication between the frontend and backend is done via REST API, with the backend providing endpoints for managing todos, timers, and records. In the beginning, timer will be used only for manual time tracking, but later whole system will be extended to support time tracking by events, like starting a task, finishing a task, etc.


<a alt="Nestjs logo" href="https://nestjs.com/" target="_blank" rel="noreferrer"><img src="https://nestjs.com/logo-small-gradient.d792062c.svg" width="36" height="40"></a>
<a alt="React logo" href="https://react.dev/" target="_blank" rel="noreferrer"><img src="https://www.cdnlogo.com/logos/r/85/react.svg" width="36" height="40"></a>
<a alt="Angular logo" href="https://angular.dev/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/svg/Angular.svg" width="42" height="40"></a>
<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="48" height="32" style="margin-bottom: 4px"></a>
<a alt="Docker logo" href="https://www.docker.com/" target="_blank" rel="noreferrer"><img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" width="42" height="40"></a>


## Development server

Run `nx serve todo-list` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Run in Docker

To run the application in Docker, you can use the provided `docker-compose.yml` file. Make sure you have Docker and Docker Compose installed, then run the following command in the root of the project:

```bash
docker-compose up -d --build
```

Ensure you have set all environment variables in the `.env` files.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
