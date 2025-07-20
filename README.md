# SMART Goal Planner

A financial goal tracking application that helps users manage and track their savings goals.

## Features

- Create, read, update, and delete financial goals
- Track progress towards each goal with visual progress bars
- Make deposits to increase saved amounts
- View overview statistics of all goals
- Filter and sort goals by various criteria
- Get warnings for goals with approaching deadlines

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the JSON server (API):
   ```
   npx json-server --watch src/db.json
   ```

2. In a separate terminal, start the React application:
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Data Structure

Each goal has the following properties:

- `id`: Unique identifier
- `name`: Name of the goal
- `targetAmount`: Total amount needed
- `savedAmount`: Current amount saved
- `category`: Category of the goal (e.g., Travel, Emergency, Electronics)
- `deadline`: Target date to complete the goal
- `createdAt`: Date when the goal was created

## API Endpoints

- `GET /goals`: Get all goals
- `POST /goals`: Create a new goal
- `GET /goals/:id`: Get a specific goal
- `PUT /goals/:id`: Update a goal (replace all properties)
- `PATCH /goals/:id`: Update specific properties of a goal
- `DELETE /goals/:id`: Delete a goal

## Technologies Used

- React.js
- JSON Server for the REST API
- JavaScript/ES6+
- CSS for styling# smartgoalplanner
