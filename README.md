# Kalei Online Shopping Platform - Admin

The **Kalei Online Shopping Platform Admin Dashboard** is a robust and feature-rich web application designed for managing and overseeing e-commerce operations. Built using **Next.js**, it ensures seamless performance, secure authentication, and efficient content management. The platform also integrates **Tailwind CSS** for modern, responsive design.

## Key Features

- **Modern Framework**: Developed with **Next.js** for server-side rendering and optimized performance.
- **Secure Authentication**: Integrated with **Keycloak** for reliable login and user management.
- **Content Management**: Utilizes **AWS S3 Bucket** for efficient asset storage and retrieval.
- **Shadcn UI**: Provides modern, accessible, and customizable design components for a sleek user interface.
- **Containerized Deployment**: Includes **Docker** and **Docker Compose** for easy application setup and deployment.
- **Tailwind CSS**: Utility-first CSS framework for building responsive and modern UIs.

## Prerequisites

Before setting up the project, ensure the following are installed on your system:

- **Node.js** (version 16 or later)
- **npm**
- **Docker** and **Docker Compose**
- **AWS CLI** (for managing the S3 Bucket)
- **Keycloak** server for authentication

## Setup Instructions

### Local Development

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Team-kaleidoscope-EAD-project/EAD-online-shopping-admin.git
   cd EAD-online-shopping-admin
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Keycloak**

   Update the Keycloak configuration in `auth.ts` located in the `src/lib/api/` directory.  
   Ensure the Keycloak server is running in the background.

4. **Configure AWS S3**

   Update the AWS S3 bucket credentials in an `.env` file:

   ```env
   AWS_ACCESS_KEY_ID="your_access_key"
   AWS_SECRET_ACCESS_KEY="your_secret_access_key"
   AWS_REGION="your_AWS_region"
   S3_BUCKET_NAME="your_S3_bucket_name"
   ```

5. **Run the Application**

   ```bash
   npm run dev
   ```

   The admin panel will be available at `http://localhost:3001`.

### Docker Deployment

1. **Build the Docker Image**

   The project includes a `Dockerfile` to containerize the application.

   ```bash
   docker build -t kalei-admin .
   ```

2. **Run with Docker Compose**

   The `docker-compose.yml` file simplifies deployment. Run the following command:

   ```bash
   docker-compose up --build
   ```

   This will start the application and its dependencies. The admin panel will be accessible at `http://localhost:3001`.

## Technologies Used

- **Next.js**: Framework for server-side rendering and optimized frontend performance.
- **Keycloak**: Secure and centralized authentication system.
- **AWS S3 Bucket**: Cloud-based asset storage and management.
- **Shadcn UI**: Modern, accessible, and customizable UI components.
- **Docker & Docker Compose**: For containerized deployment.
- **Tailwind CSS**: Utility-first CSS framework for building modern user interfaces.

## Contributing

We welcome contributions! Here’s how you can help:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with descriptive messages.
4. Submit a pull request detailing your updates.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---
