# AI Chef - Your Personal Nutrition Assistant

A comprehensive web application that helps users manage their ingredients, discover recipes, and maintain a healthy diet.

## Features

- User authentication and personal dashboard
- Ingredient inventory management
- Recipe suggestions based on available ingredients
- Weekly meal tracking
- Nutritional analysis and recommendations
- Shopping list generation

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js/Express with TypeScript
- Database: MongoDB
- Authentication: JWT
- UI Framework: Material-UI

## Project Structure

```
ai-chef/
├── client/             # Frontend React application
├── server/             # Backend Node.js/Express application
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both client and server directories
   - Add necessary environment variables (see .env.example files)

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## Contributing

Feel free to submit issues and enhancement requests. 