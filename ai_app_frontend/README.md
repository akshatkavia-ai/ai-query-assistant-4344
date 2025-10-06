# AI Query Assistant - Frontend

React-based frontend application for the AI Query Assistant. This application provides a clean, intuitive interface for users to ask questions and receive AI-generated answers from the backend service.

## Features

- **Simple Question Interface**: Clean form for submitting questions
- **Real-time Responses**: Display AI-generated answers instantly
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: User-friendly error messages and status indicators
- **Bold Neon Cyber Theme**: High-contrast dark theme with vibrant green accents

## Architecture

```
ai_app_frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main application component
│   ├── index.js            # Application entry point
│   ├── components/
│   │   ├── QuestionForm.js    # Question input form
│   │   └── ResponseDisplay.js # Answer display component
│   ├── services/
│   │   └── api.js          # Backend API integration
│   └── styles/             # CSS styling
├── package.json            # Dependencies and scripts
└── .env.example           # Environment variable template
```

## Prerequisites

- **Node.js**: 14.x or higher
- **npm**: 6.x or higher (comes with Node.js)
- **Backend API**: The backend service must be running (see backend README)

## Environment Variables

The frontend requires the following environment variable:

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | URL of the backend API server | `http://localhost:3001` |

**Important**: 
- All React environment variables must start with `REACT_APP_`
- Changes to `.env` require restarting the development server

### Setting Up Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your backend URL:
   ```bash
   # For local development (default)
   REACT_APP_BACKEND_URL=http://localhost:3001

   # For production deployment
   REACT_APP_BACKEND_URL=https://your-backend-api.com
   ```

3. Restart the development server if it's already running

## Installation & Setup

### Step 1: Install Dependencies

```bash
# Navigate to frontend directory
cd ai_app_frontend

# Install all dependencies
npm install
```

This will install:
- React and React DOM
- React Scripts (Create React App tooling)
- All required dependencies

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env if needed (optional for local development)
nano .env  # or use your preferred editor
```

The default configuration (`http://localhost:3001`) works for local development if the backend is running on the default port.

### Step 3: Start Development Server

```bash
# Start the development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view ai-query-assistant-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

The application will:
- Open automatically in your default browser
- Be available at `http://localhost:3000`
- Hot-reload when you make changes to the code

## Usage

### Using the Application

1. **Start the Backend**: Ensure the backend API is running on port 3001
   ```bash
   # In the backend directory
   uvicorn src.api.main:app --host 0.0.0.0 --port 3001 --reload
   ```

2. **Start the Frontend**: Run `npm start` (if not already running)

3. **Ask Questions**:
   - Type your question in the input field
   - Click "Ask AI" or press Enter
   - Wait for the AI-generated response
   - View the answer displayed below the form

4. **Ask Another Question**:
   - Previous answers are replaced with new ones
   - Each question is stored in the database via the backend

### Example Workflow

```
1. User opens http://localhost:3000
2. User types: "What is machine learning?"
3. User clicks "Ask AI"
4. Frontend shows loading state
5. Backend processes with Gemini AI
6. Answer appears on screen
```

## Available Scripts

### `npm start`

Runs the app in development mode.
- Open http://localhost:3000 to view it in your browser
- The page will reload when you make changes
- You will also see any lint errors in the console

### `npm test`

Launches the test runner in interactive watch mode.

```bash
npm test
```

See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

```bash
npm run build
```

This will:
- Optimize the build for best performance
- Bundle React in production mode
- Minify the code
- Create static files ready for deployment

The build is minified and the filenames include hashes.

**Deploy the `build` folder** to your hosting service.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you need full control over the build configuration:

```bash
npm run eject
```

This will copy all configuration files and dependencies into your project.

## Styling & Theme

The application uses a **Bold Neon Cyber** theme with the following characteristics:

### Color Scheme

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary (Neon Green) | Emerald | `#10B981` |
| Secondary | Amber | `#F59E0B` |
| Background | Dark Slate | `#0F172A` |
| Surface | Gray | `#1F2937` |
| Text | White | `#FFFFFF` |
| Success | Green | `#10B981` |
| Error | Red | `#EF4444` |

### Design Principles

- **High Contrast**: Dark backgrounds with vibrant accents
- **Bold Typography**: Strong visual emphasis
- **Rounded Corners**: Modern, friendly appearance
- **Responsive Layout**: Centered form layout that adapts to screen size
- **Visual Feedback**: Loading states, hover effects, error indicators

## API Integration

The frontend communicates with the backend through the `/ask` endpoint.

### API Request

```javascript
POST http://localhost:3001/ask
Content-Type: application/json

{
  "question": "What is artificial intelligence?"
}
```

### API Response

```javascript
{
  "answer": "Artificial intelligence (AI) is...",
  "id": 1,
  "created_at": "2024-01-15T10:30:00.123456+00:00"
}
```

### Error Handling

The frontend handles various error scenarios:

1. **Network Errors**: Backend not reachable
2. **Server Errors**: Backend returns 5xx status
3. **Validation Errors**: Invalid input
4. **Timeout Errors**: Request takes too long

## Troubleshooting

### Issue 1: "Failed to fetch" or Network Error

**Symptoms:**
- Error message: "Failed to connect to the backend"
- Questions don't get responses
- Browser console shows network errors

**Solutions:**

1. **Verify backend is running:**
   ```bash
   curl http://localhost:3001/health
   ```
   Should return: `{"status": "healthy", ...}`

2. **Check REACT_APP_BACKEND_URL:**
   ```bash
   cat .env | grep REACT_APP_BACKEND_URL
   ```
   Should be: `REACT_APP_BACKEND_URL=http://localhost:3001`

3. **Restart frontend after changing .env:**
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

4. **Check for CORS errors in browser console:**
   - If you see CORS errors, check backend CORS configuration
   - Backend should allow `http://localhost:3000`

5. **Verify ports:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

### Issue 2: CORS Policy Errors

**Symptoms:**
- Browser console: "blocked by CORS policy"
- Requests fail even though backend is running
- Network tab shows failed requests

**Solutions:**

1. **Check backend CORS configuration:**
   ```bash
   # In backend .env file
   CORS_ORIGINS=http://localhost:3000
   ```

2. **Restart backend after CORS changes**

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or clear cache in browser settings

4. **Check browser console** for exact error message

### Issue 3: Backend Returns 500 Errors

**Symptoms:**
- Error message displays in UI
- Backend logs show errors
- Status code 500 in network tab

**Common Causes:**

1. **Database not available:**
   - Check PostgreSQL is running
   - Verify DATABASE_URL in backend .env
   - Run backend database init script

2. **Backend not fully started:**
   - Wait for backend startup to complete
   - Check backend logs for errors

3. **Backend configuration issue:**
   - Check all backend environment variables
   - Verify GEMINI_API_KEY is set

**Solutions:**
- See backend README troubleshooting section
- Check backend logs for specific errors
- Ensure database is initialized

### Issue 4: Gemini API Returns 401/403

**Symptoms:**
- Error: "AI service is not available"
- Backend logs show Gemini API errors
- Answers not generated

**Solutions:**

1. **Verify GEMINI_API_KEY in backend .env:**
   ```bash
   cd ../ai_app_backend
   cat .env | grep GEMINI_API_KEY
   ```

2. **Check API key is valid:**
   - Visit https://makersuite.google.com/app/apikey
   - Verify key hasn't been revoked
   - Create new key if needed

3. **Check API quota:**
   - Gemini API has rate limits
   - Wait a few minutes if quota exceeded
   - Check Google AI Studio for quota status

4. **Restart backend** after updating API key

### Issue 5: Port 3000 Already in Use

**Symptoms:**
- Error: "Something is already running on port 3000"
- `npm start` fails

**Solutions:**

1. **Find and kill process using port 3000:**
   ```bash
   # Linux/Mac
   lsof -i :3000
   kill -9 <PID>
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Or use a different port:**
   ```bash
   PORT=3002 npm start
   ```
   Note: Update backend CORS_ORIGINS if using different port

### Issue 6: Blank Page or White Screen

**Symptoms:**
- Browser shows blank/white page
- No errors in console
- Build succeeded but nothing displays

**Solutions:**

1. **Check browser console for errors**

2. **Clear browser cache and reload:**
   ```bash
   Ctrl+Shift+R  # Hard refresh
   ```

3. **Rebuild the application:**
   ```bash
   rm -rf node_modules build
   npm install
   npm start
   ```

4. **Check for JavaScript errors:**
   - Open browser DevTools (F12)
   - Look for errors in Console tab

### Issue 7: Environment Variable Not Working

**Symptoms:**
- REACT_APP_BACKEND_URL changes don't take effect
- Still using old URL

**Solutions:**

1. **Restart development server** (required for .env changes):
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

2. **Verify variable name starts with REACT_APP_:**
   ```bash
   # Correct:
   REACT_APP_BACKEND_URL=http://localhost:3001
   
   # Wrong (won't work):
   BACKEND_URL=http://localhost:3001
   ```

3. **Check .env file is in project root:**
   ```bash
   ls -la .env
   ```

4. **No spaces around = sign:**
   ```bash
   # Correct:
   REACT_APP_BACKEND_URL=http://localhost:3001
   
   # Wrong:
   REACT_APP_BACKEND_URL = http://localhost:3001
   ```

## Startup Order

For the full application to work, start services in this order:

1. **Database (PostgreSQL)**: Must be running
2. **Backend API**: Start backend server on port 3001
3. **Frontend**: Start React dev server on port 3000

```bash
# Terminal 1: Backend
cd ai_app_backend
source venv/bin/activate
uvicorn src.api.main:app --host 0.0.0.0 --port 3001 --reload

# Terminal 2: Frontend
cd ai_app_frontend
npm start
```

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment

The `build` folder contains static files that can be deployed to:

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Cloud Platforms**: AWS S3, Google Cloud Storage, Azure Static Web Apps
- **Traditional Hosting**: Any web server (Apache, Nginx)

### Environment Variables for Production

Before building for production, update `.env`:

```bash
REACT_APP_BACKEND_URL=https://your-production-backend.com
```

Then build:

```bash
npm run build
```

### Example Deployment Commands

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=build
```

**Vercel:**
```bash
npm run build
vercel --prod
```

**Static Server (for testing):**
```bash
npm install -g serve
serve -s build -l 3000
```

## Browser Support

This application supports modern browsers:

### Production
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Development
- Latest Chrome
- Latest Firefox
- Latest Safari

## Performance Optimization

The application includes:
- Code splitting
- Lazy loading
- Production build optimizations
- Minification
- Asset optimization

## Project Structure Details

```
src/
├── App.js                    # Main component, state management
├── index.js                  # Entry point, renders App
├── components/
│   ├── QuestionForm.js       # Input form for questions
│   └── ResponseDisplay.js    # Display area for answers
└── services/
    └── api.js               # Backend API calls
```

## Development Tips

1. **Hot Reloading**: Changes to `.js` files reload automatically
2. **Console Logging**: Check browser console for debugging
3. **Network Tab**: Monitor API requests in DevTools
4. **React DevTools**: Install browser extension for React debugging

## Support & Resources

- **Create React App Documentation**: https://create-react-app.dev/
- **React Documentation**: https://react.dev/
- **Backend API Docs**: http://localhost:3001/docs (when backend is running)

## Known Limitations

- Single question at a time (previous answers are replaced)
- No question history display in UI (stored in backend database)
- No authentication/authorization
- No rate limiting on frontend

## Future Enhancements

Potential features for future versions:
- Question history display
- User authentication
- Multiple conversation threads
- Save/favorite questions
- Export Q&A pairs

## License

[Your License Here]

## Version

**Current Version**: 1.0.0

---

**Note**: This frontend requires the AI Query Assistant backend to be running. See the backend README for setup instructions.
