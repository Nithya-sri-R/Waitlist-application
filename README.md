# 🚀 Waitlist Application

## 📱 Overview
Welcome to the Waitlist Application, a platform designed to manage a waiting list for a new iPhone product. This application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to provide a seamless user experience.

### 📋 Application Features:
- **Sign Up**: Potential customers can sign up for the waiting list using their email address.
- **Position Display**: Customers can view their position on the waiting list after signing up.
- **Unique Referral Link**: Customers receive a unique referral link to share with friends.
- **Referral System**: Using the referral link, customers move up one place in their position for each friend who signs up.
- **Coupon Code**: When a customer reaches position 1, they receive an email with a coupon code.

### 🛠️ Installation

To set up the Waitlist Application locally, follow these steps:

1. **Node.js**: Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

2. **MongoDB**: Install MongoDB on your system by following the instructions at [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).

3. **Clone the Repository**: Clone the Waitlist Application repository to your local machine:

   ```bash
   git clone https://github.com/Nithya-sri-R/Waitlist-application

### 👨‍💼 Administrator Area:
- Create, edit, read, list, and delete waiting lists.
- View the list of customers who signed up for the waiting list.

### 🌐 Frontend:
- Sign-up form for potential customers to enter their email address and join the waiting list.
- Display the customer's position immediately after signing up.
- Provide a unique referral link upon sign-up.
- Send an email when a customer reaches position 1. 📧

## 🛠️ Installation

To set up the Waitlist Application, follow these steps:

1. **Node.js**: Download and install Node.js from [https://nodejs.org/](https://nodejs.org/). 📦

2. **MongoDB**: Install MongoDB on your system by following the instructions at [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community). 🍃

3. **Clone the Repository**: Clone the Waitlist Application repository to your local machine:

   ```bash
   git clone https://github.com/preethishanmugham/Waitlist_Application.git
   cd Waitlist_Application
   ```

## 🛠️ Backend Setup

To set up the backend of the Waitlist Application, follow these steps:

1. **Navigate to the Backend Folder**:
   - Open your terminal or command prompt.
   - Change directory to the `server` folder within the cloned repository:

     ```bash
     cd server
     ```

2. **Install Backend Dependencies**:
   - Run the following command to install all necessary backend dependencies:

     ```bash
     npm install
     ```

3. **Create a `.env` File**:
   - Inside the `server` folder, create a `.env` file.
   - Configure the `.env` file with the following environment variables:

     ```dotenv
     PORT=8000
   MONGO_URL=mongodb+srv://rnithyasri34:W6B9VfKIr9rb56RK@cluster0.qw5cqqh.mongodb.net/Waitlist-app?retryWrites=true&w=majority&appName=Cluster0
     EMAIL=rnithyasri34@gmail.com
     PASSWORD=vscgkjnpohapuksq
     JWT_SECRET=2bc347bc3d0726ef2079a1945bc1bcf14c71a188e2a207196e5708e0655e58c1
     ```

   .

4. **Start the Backend Server**:
   - Start the backend server by running:

     ```bash
     node index.js
     ```

   - This will launch the backend server at `http://localhost:8000`.

5. **API Routes**:
   - Here are the API routes available in the backend:

     - **Register a User**:
       - Method: POST
       - URL: `http://localhost:8000/api/auth/register`
       - Description: Registers a new user.
       - Request Body:
         ```json
         {
           "name": "John",
           "email": "john@example.com",
           "password": "your_password"
         }
         ```

     - **Login a User**:
       - Method: POST
       - URL: `http://localhost:8000/api/auth/login`
       - Description: Logs in an existing user.
       - Request Body:
         ```json
         {
           "email": "john@example.com",
           "password": "your_password"
         }
         ```

     - **Send OTP**:
       - Method: POST
       - URL: `http://localhost:8000/api/auth/send-otp`
       - Headers: `Authorization: Bearer <your_jwt_token>`
       - Description: Sends OTP to the user's email for verification.
       - Request Body:
         ```json
         {
           "email": "john@example.com"
         }
         ```

     - **Verify OTP**:
       - Method: POST
       - URL: `http://localhost:8000/api/auth/verify-otp`
       - Headers: `Authorization: Bearer <your_jwt_token>`
       - Description: Verifies the OTP entered by the user.
       - Request Body:
         ```json
         {
           "otp": "1234"
         }
         ```

     - **Join Room**:
       - Method: POST
       - URL: `http://localhost:8000/api/room/join`
       - Middleware: `protectedMiddleware`
       - Description: Allows a verified user to join a room.
       - if u need any body json u can give
       - header key-'Authorization' value-"Bearer "+ token
      - **Get Room Details**:
       - Method: GET
       - URL: `http://localhost:8000/api/room/get`
       - Middleware: `protectedMiddleware`
       - Description: Retrieves details of the room.
       - Returns: Room details or relevant information.

## 🛠️ Frontend Setup

To set up the frontend of the Waitlist Application, follow these steps:

1. **Navigate to the Frontend Folder**:
   - Open another terminal or command prompt window.
   - Change directory to the `client` folder within the cloned repository:

     ```bash
     cd client
     ```

2. **Install Frontend Dependencies**:
   - Run the following command to install all necessary frontend dependencies:

     ```bash
     npm install
     ```

3. **Create a `.env` File**:
   - Inside the `client` folder, create a `.env` file.
   - Set the base URL for the frontend to communicate with the backend:

     ```dotenv
     REACT_APP_BASE_URL=http://localhost:8000
     ```

4. **Start the Frontend Development Server**:
   - Start the frontend development server by running:

     ```bash
     npm start
     ```

   - This will launch the frontend application at `http://localhost:3000`.

5. **Access the Application**:
   - Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the Waitlist Application.

6. **Access the Application**: Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the Waitlist Application.

## 📝 Usage

1. **Sign Up**: Potential customers can sign up for the waiting list by entering their email address. 📥

2. **Position Display**: After signing up, the customer's position on the waiting list will be displayed. 📊

3. **Referral Link**: Customers will receive a unique referral link that they can share with friends. 🤝

4. **Referral System**: When a friend signs up using the referral link, the customer's position will move up by 1 place. 🚀

5. **Coupon Code**: When a customer reaches position 1, they will receive an email with a coupon code to purchase the new product. 🎁

## 🕵️ Administrator Area

To access the administrator area, log in with your admin credentials.

- **Username**: rnithyasri34@gmail.com
- **Password**: Saras@1976

## API Routes
User Routes
POST https://8000/api/auth/register
Registers a new user.
Sample request body:
   {
  "name": "John",
  "email": "john@example.com",
  "password": "123"
   }
Login a User
POST /api/auth/login
Logs in an existing user.
Sample request body:
    {
  "email": "john@example.com",
  "password": "123"
    }
Send OTP:
Method: POST
URL: http://localhost:8000/api/auth/send-otp
Headers: Authorization: Bearer <your_jwt_token>

Verify OTP:
Method: POST
URL: http://localhost:8000/api/auth/verify-otp
Headers: Authorization: Bearer <your_jwt_token>
Body:
 {
  "otp": "1234"
}
Join Room

- **POST** `/api/room/join`
  - Description: Allows a verified user to join a room.
  - Middleware: `protectedMiddleware`
  - Controller: `joinRoom`
  - Example:
    ```json
    {
      "userId": "your_user_id_here",
      "roomId": "your_room_id_here"
    }
    ```
  - Returns: Success message upon successfully joining the room.

## 🎉 Conclusion

The Waitlist Application is designed to provide a smooth and interactive experience for potential customers eager to join the waiting list for a new iPhone product. It includes both user and administrator features to manage and monitor the waiting list effectively. Enjoy using the application and welcoming customers to the world of exciting new products! 📱✨
