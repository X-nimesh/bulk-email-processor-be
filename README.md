# Backend Application for Bulk Email Processor

## Overview

This repository contains the backend application for the project. It provides API endpoints that the frontend application interacts with.

Link to Frontend Repo.-> **[Frontend Repo](https://github.com/X-nimesh/bulk-email-processor-FE)**

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. **Clone the Repository**

   ```bash
   git clone https://github.com/X-nimesh/bulk-email-processor-ekbana.git
   cd <BACKEND_DIRECTORY>
   ```

2. **Clone the Repository**

   Create a .env file in the root of your backend directory and add the following configuration:

   ```bash
    MAILER_HOST=live.smtp.mailtrap.io
    MAILER_PORT=587
    MAILER_USER=api
    PASSWORD=
   ```

   other env are already setup in the docker-compose.yml file

3. **Clone the Repository**

   Use Docker Compose to build and start the backend application along with PostgreSQL and RabbitMQ:

   ```bash
   docker-compose up -d --build
   ```

4. **Access backend and swagger docs**

   ```bash
   The backend service will be available internally to other containers at http://localhost:3000 .
   ```

   For local testing or integration, here is the link of swagger docs -> http://localhost:3000/docs

   Database can be accessed at **http://localhost:5432**

   Rabbitmq can be accessed at **http://localhost:15672**

5. **Stopping the Backend**

   To stop the backend container and related services, run:

   ```bash
   docker-compose down
   ```
