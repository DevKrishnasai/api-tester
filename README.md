# API Tester

API Tester is a web-based tool for testing and interacting with APIs. It allows users to make HTTP requests, view responses, and manage headers and parameters. This project is built using Next.js, Tailwind CSS, and ShadCN UI.

## Tech Stack

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN UI**: A collection of customizable UI components for React.

## Features

- **Base URL Input**: Easily specify the base URL for your API.
- **Request Types**: Supports GET, POST, PUT, and DELETE HTTP methods.
- **Route Path Input**: Define specific API endpoints.
- **Optional Parameters**: Add and manage query parameters.
- **Request Body**: Add JSON payloads for POST and PUT requests.
- **Bearer Token and Custom Headers**: Include authorization tokens and custom headers in requests.
- **Response Viewer**: Display and format JSON responses from API requests.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DevKrishnasai/api-tester
   ```

2. **Navigate to the project directory:**

   ```bash
   cd api-tester
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Usage

1. Enter the base URL of the API you want to test.
2. Select the request type (GET, POST, PUT, DELETE).
3. Specify the route path.
4. (Optional) Add query parameters and headers.
5. (Optional) Add a JSON body for POST and PUT requests.
6. Click "Send" to make the request.
7. View the response in the response viewer.
