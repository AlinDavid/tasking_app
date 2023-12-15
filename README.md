# Tasking App

This is a full-stack tasking application that incorporates various features for task management.

## Features

- **Authentication and Authorization:** Utilizes JWT for secure user authentication and authorization.
- **API Gateway:** Implements an API Gateway to manage and route incoming API requests (Acts like a proxy server and handle authentication and authorization).
- **Microservices Architecture:** Follows the microservices pattern using NestJS for building scalable and maintainable backend services.
- **Swagger Documentation:** Provides Swagger documentation for the API endpoints (Work in Progress).
- **Frontend Application:** Utilizes NextJS for the frontend application, offering an intuitive user interface.
- **Containerization:** Utilizes Docker for containerizing the application.
- **Database Integration:** Utilizes MongoDB for storing capabilities.

## How to Run Locally

1. Clone the repository and navigate to the project directory.
2. Copy the `.env.example` file and rename it to `.env` at the root of the directory.
3. Run the following command to start the application using Docker:

   ```bash
   docker-compose up -d
   ```

4. Access the frontend application in your browser by visiting [http://localhost:3000](http://localhost:3000). The backend API runs at [http://localhost:8000/api](http://localhost:8000/api).

## Additional Notes

- At the moment, it takes longer to build all the containers because the lerna doesn't allow me to have separate node_modules and lockfiles (Work in progress)
- Make sure Docker is installed and running on your local machine.
- For API documentation, visit [http://localhost:8000/api/swagger](http://localhost:8000/api/swagger) (Note: This feature is a work in progress).

## How install Dependencies

- Although for running locally you don't need this, but to install the dependencies run the following command (Make sure you have lerna installed globally):
  ```bash
  lerna exec yarn
  ```

## License

This project is licensed under the [MIT License](LICENSE).
