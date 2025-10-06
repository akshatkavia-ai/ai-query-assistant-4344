# AI Question Assistant - Frontend

A modern React application with a **Neon Cyber** theme that allows users to ask questions and receive AI-generated answers from the backend API.

## Features

- **Neon Cyber Theme**: Dark background with vibrant neon green (#10B981) and amber (#F59E0B) highlights
- **Bold Design**: High-contrast, visually striking aesthetic with strong visual emphasis
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Real-time Feedback**: Loading states, error handling, and smooth animations
- **Accessible**: Keyboard navigation support and reduced motion preferences

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (default: http://localhost:3001)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
```

**Important**: For Create React App, environment variables must be prefixed with `REACT_APP_`.

### 3. Start Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Environment Configuration

### Development

For local development with the backend running on port 3001:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
```

### Production

For production deployment, set the environment variable to your deployed backend URL:

```env
REACT_APP_API_BASE_URL=https://your-backend-domain.com
```

**Note**: If `REACT_APP_API_BASE_URL` is not set, the app defaults to `http://localhost:3001`.

## Available Scripts

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include hashes.

## Project Structure

```
src/
├── api/
│   └── client.js           # API client for backend communication
├── components/
│   ├── QuestionForm.jsx    # Form component for user input
│   └── AnswerPanel.jsx     # Component for displaying AI responses
├── styles/
│   └── theme.css           # Neon Cyber theme styles
├── App.jsx                 # Main application component
├── App.css                 # App-specific layout styles
├── index.js                # Application entry point
└── index.css               # Global base styles
```

## Usage

1. **Ask a Question**: Type your question in the text area
2. **Submit**: Click the "Get Answer" button or press Enter
3. **View Response**: The AI-generated answer will appear below with a timestamp
4. **Error Handling**: If the backend is unavailable or returns an error, a clear error message will be displayed

## Neon Cyber Theme

The application uses a bold, high-contrast design with:

- **Background**: Deep slate (#0F172A)
- **Surface**: Dark gray (#1F2937)
- **Primary**: Neon green (#10B981)
- **Secondary**: Amber (#F59E0B)
- **Text**: White (#FFFFFF)

Key design elements:
- Glow effects on text and borders
- Smooth animations and transitions
- Rounded corners and modern typography
- Gradient backgrounds with neon highlights

## API Integration

The frontend communicates with the backend via the `/ask` endpoint:

**Request:**
```json
POST /ask
{
  "question": "Your question here"
}
```

**Response:**
```json
{
  "answer": "AI-generated answer",
  "id": 123,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Troubleshooting

### Backend Connection Issues

If you see "Unable to connect to the backend" error:

1. Verify the backend is running
2. Check the `REACT_APP_API_BASE_URL` in your `.env` file
3. Ensure CORS is properly configured on the backend
4. Check browser console for detailed error messages

### Environment Variables Not Working

- Make sure the variable name starts with `REACT_APP_`
- Restart the development server after changing `.env`
- Clear browser cache if needed

### Build Errors

If you encounter build errors:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Backend API Documentation](../ai_app_backend/README.md)

## License

This project is part of the AI Query Assistant application.
