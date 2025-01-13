# Dragons of Mugloar

Here is the live demo of the application deployed on netlify.
https://mugloar-dragon.netlify.app/

## Setup Instructions

- Clone the project with this command - "git clone https://github.com/gurparshad/mugloar-dragons.git"
- Now you can follow the instructions below.

### With Docker

- Ensure Docker is installed on your machine. You can download and install Docker from the official website. https://docs.docker.com/get-started/get-docker/
- Run command "docker build -t mugloar-dragons ." to build the docker image.
- Run "docker run -p 3000:3000 mugloar-dragons" to start the container.
- You can name the Docker image anything you like; in the example above, it is named mugloar-dragons.
- Application will start at http://localhost:3000
- You can use either Docker Desktop (with its graphical interface) or the Docker CLI (Command Line Interface) to manage and run the Docker containers, depending on your preference.
- Find the running container ID by listing all containers using command - "docker ps"
- Stop the container by running: - "docker stop <container-id>"

### Without Docker

- Node version 20 is used in the project so please install that to avoid any errors. You can download it from https://nodejs.org/en or Install it using nvm https://github.com/nvm-sh/nvm
- Change the node version by running this command "nvm use 20"
- Run "npm install" to install the packages
- Run "npm run start" to start the application.
- Application will start at http://localhost:3000

### `Tech Stack`

- Typescript
- SCSS
- React (Create React app)
- Node version 20
- Prettier for Formatting
- Eslint for linting
- RTK - Redux Tool Kit
- Local storage for persistence.
- Best practices.

### Further Improvements in the project

- Remove the depreciating warnings regarding Dart Sass package update in the future. This can be resolved by suppressing the warnings using the tools like react-app-rewired. This package allows us to override the CRA Webpack configuration without ejecting.
- Include Test cases.
- Sort Configuration can also be stored in the local storage.
- UI can always be improved for example the the score and sorting section could be more visually appealing.
