# Dragons of Mugloar

Here is the live demo of the application deployed on netlify.
https://mugloar-dragon.netlify.app/

## Game Rules

- The tasks have different difficulty levels.
- As you complete tasks, you will earn gold.
- You can use the gold to purchase items from the shop to help you level up.
- Some tasks are green (easier), while others are red (more difficult).
- You might fail to complete the red tasks as they are much harder than green ones.
- Earn gold and level up! At certain levels, red cards will automatically turn green.

User will be able to try and play any ads he want, but there will be chances that he will lose if he try high risk ads. I prepared this level system to help user to choose the ads to solve. it shows the probability and the level value.

1. Probability: "Piece of cake" | Value: 0 | Description: "Extremely easy, no risk involved."
2. Probability: "Sure thing" | Value: 0 | Description: "Very likely to succeed with minimal effort."
3. Probability: "Walk in the park" | Value: 0 | Description: "Easy task, no major challenges."
4. Probability: "Quite likely" | Value: 3 | Description: "Good chance of success, but requires some effort."
5. Probability: "Hmmm...." | Value: 4 | Description: "Moderate chance, might require additional strategy."
6. Probability: "Gamble" | Value: 5 | Description: "Risky, with a balanced chance of success and failure."
7. Probability: "Risky" | Value: 6 | Description: "High risk, but the reward could be worthwhile."
8. Probability: "Playing with fire" | Value: 7 | Description: "Very risky, success is uncertain."
9. Probability: "Rather detrimental" | Value: 8 | Description: "A dangerous task, likely to lead to failure or negative outcomes."
10. Probability: "Suicide mission" | Value: 9 | Description: "Almost certain failure, proceed with extreme caution."

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
- Responsive Design.
- Design system.
- Solid Error Handling.

### Reason for using above tech stack

While it's possible to build small applications using simpler tools like the Context API and regular CSS files, this tech stack was chosen to reflect industry best practices and ensure scalability. Even for smaller projects, using modern tools and technologies helps to stay aligned with real-world application development. By adhering to these practices, i am setting up the project to be easily maintainable and extendable.

### Further Improvements in the project

- Remove the depreciating warnings regarding Dart Sass package update in the future. This can be resolved by suppressing the warnings using the tools like react-app-rewired. This package allows us to override the CRA Webpack configuration without ejecting.
- Include Test cases.
- Sort Configuration can also be stored in the local storage.
- UI can always be improved for example the the score and sorting section could be more visually appealing.
- Closing the Modal when user click outside the modal (but depends)
