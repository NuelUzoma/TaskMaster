
---

# TaskMaster

TaskMaster is a task management API built with [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) that allows you to create, read, update, and delete tasks and user accounts. It provides a RESTful API for managing tasks and user authentication.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)
- [Contributing](#contributing)
- [Support and Contact](#support-and-contact)

## Features

- **User Authentication:** Register and login users with password hashing and JWT authentication.
- **Task Management:** Create, read, update, and delete tasks.
- **Secure:** Passwords are hashed for security, and user inputs are validated.
- **Scalable:** Built with Node.js and MongoDB, making it easy to scale as your project grows.

## Requirements

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager
- Text editor or IDE (e.g., [Visual Studio Code](https://code.visualstudio.com/))

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NuelUzoma/TaskMaster.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TaskMaster
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root and set your environment variables:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmaster
   JWT_SECRET=your-secret-key
   ```

   Replace `your-secret-key` with a strong secret key for JWT token generation.

2. Start the server:

   ```bash
   npm start
   ```

   The server should now be running on the specified port (default is 5000).

## Usage

To use the TaskMaster API, you can make HTTP requests to the provided endpoints. You can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) for testing the API.

## API Endpoints

- **User Registration:**
  - `POST /api/user/register`: Register a new user.


- **User Login:**
  - `POST /api/user/login`: Authenticate a user and receive a JWT token.


- **Retrieve Users**
  - `GET /api/users`: Retrieve all users.


- **Retrieve Users by ID**
  - `GET /api/users/:id`: Retrieve a user by ID.


- **Task Management:**
  - `GET /api/tasks`: Retrieve all tasks.
  - `GET /api/tasks/retrieve/:id`: Retrieve a task by ID.
  - `POST /api/tasks/create`: Create a new task.
  - `PUT /api/tasks/update/:id`: Update a task by ID.
  - `DELETE /api/tasks/delete/:id`: Delete a task by ID.

For detailed Project, API documentation and usage examples, refer to the [Project Documentation](https://docs.google.com/document/d/1Rc0edCQLR3FAB4mGsLy4QO2nAt85QZP-zkpg4tywLTs/edit).

## Testing

To run tests using Mocha, use the following command:

```bash
npm test
```

## Deployment

To deploy TaskMaster to a production environment, follow your chosen hosting provider's deployment guidelines. Ensure that you set up environment variables for security-sensitive configurations.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please refer to the [Contributing Guidelines](CONTRIBUTING.md) for more information.

## Support and Contact

If you have any questions or need assistance, feel free to contact me at [Emmanuel Madubuike](emmanuelmadubuike.dev@gmail.com).

---

