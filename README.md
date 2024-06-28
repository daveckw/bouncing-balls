# Bouncing Balls Simulation

This project is a React-based interactive simulation of bouncing balls with realistic collision physics. It demonstrates the use of React hooks for state management and animation, as well as basic physics principles for elastic collisions.

## Features

- Multiple balls with different colors and masses
- Realistic elastic collisions between balls
- Balls bounce off the edges of the window
- Interactive "Add Actor" button to introduce new balls with random properties
- Smooth animation using React's `useEffect` and `useState` hooks

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm (Node Package Manager)
- You have a basic understanding of React and JavaScript

## Installing Bouncing Balls Simulation

To install the Bouncing Balls Simulation, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/daveckw/bouncing-balls.git
   ```
2. Navigate to the project directory:
   ```
   cd bouncing-balls
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Using Bouncing Balls Simulation

To use the Bouncing Balls Simulation, follow these steps:

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your web browser and go to `http://localhost:xxxx`
3. You should see the simulation running with several colored balls bouncing around
4. Click the "Add Actor" button in the bottom right corner to add new balls with random properties

## How It Works

The simulation uses React's state management to keep track of each ball's position, velocity, and other properties. The main components are:

- `App.js`: The main component that manages the state of all balls and handles the animation loop
- `Ball.js`: A component that renders each individual ball

The physics simulation includes:

- Elastic collisions between balls, taking into account their masses
- Boundary checking to make balls bounce off the edges of the window
- Velocity updates based on collisions and boundary interactions

## Contributing to Bouncing Balls Simulation

To contribute to the Bouncing Balls Simulation, follow these steps:

1. Fork this repository
2. Create a branch: `git checkout -b <branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request

## Contact

If you want to contact me, you can reach me at `daveckw@gmail.com`.

## License

This project uses the following license: [MIT License](https://opensource.org/licenses/MIT)
