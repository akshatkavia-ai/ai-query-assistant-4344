# AI Query Assistant - Frontend

React-based frontend application for the AI Query Assistant. This application provides a clean, intuitive interface for users to ask questions and receive AI-generated answers from the backend service.

## Local Development Setup

**Important: For local development, use these exact ports:**
- **Frontend**: http://localhost:3000 (React dev server)
- **Backend**: http://localhost:3001 (FastAPI server)

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
├── .env                    # Environment configuration (localhost)
└── .env.example           # Environment variable template
```

## Prerequisites

- **Node.js**: 14.x or higher
- **npm**: 6.x or higher (comes with Node.js)
- **Backend API**: The backend service must be running on port 3001

## Environment Variables

The frontend requires **only one** environment variable for local development:

| Variable | Description | Local Value |
|----------|-------------|-------------|
| `REACT_APP_BACKEND_URL` | URL of the backend API server | `http://localhost:3001` |

**Important Notes:**
- All React environment variables must start with `REACT_APP_`
- **Changes to `.env` REQUIRE restarting the development server** (Ctrl+C then `npm start`)
- The `.env` file should contain ONLY `REACT_APP_BACKEND_URL` for frontend
- Backend-specific variables (DATABASE_URL, GEMINI_API_KEY, CORS_ORIGINS) belong in backend's `.env`

### Setting Up Environment Variables

The `.env` file is already configured for local development with:
```bash
REACT_APP_BACKEND_URL=http://localhost:3001
```

**Sanity Check:** If you see any of these variables in the frontend `.env`, **remove them**:
- ❌ `REACT_APP_GEMINI_API_KEY` (belongs in backend)
- ❌ `REACT_APP_DATABASE_URL` (belongs in backend)
- ❌ `REACT_APP_CORS_ORIGINS` (belongs in backend)
- ❌ `REACT_APP_REACT_APP_BACKEND_URL` (duplicate/typo)

**For production deployment:**
Update `.env` with your production backend URL, then rebuild:
```bash
REACT_APP_BACKEND_URL=https://your-backend-api.com
npm run build
```

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

### Step 2: Verify Environment Configuration

```bash
# Check .env file contains only the backend URL
cat .env
# Should show: REACT_APP_BACKEND_URL=http://localhost:3001
```

### Step 3: Start Development Server

```bash
# Start the development server (port 3000)
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
- Open automatically in your default browser at http://localhost:3000
- Hot-reload when you make changes to the code
- Log the backend URL being used (check browser console)

## Usage

### Local Development Workflow

1. **Start Backend First** (in backend directory):
   ```bash
   cd ../ai_app_backend
   uvicorn src.api.main:app --host 0.0.0.0 --port 3001 --reload
   ```

2. **Start Frontend** (in frontend directory):
   ```bash
   cd ai_app_frontend
   npm start
   ```

3. **Verify Connection**:
   - Open browser console (F12)
   - Look for: `API Base URL: http://localhost:3001`
   - Backend should show CORS configured for `http://localhost:3000`

4. **Test the Application**:
   - Type a question in the input field
   - Click "Ask AI" or press Enter
   - Wait for the AI-generated response
   - View the answer displayed below the form

### Example Workflow

```
1. User opens http://localhost:3000
2. User types: "What is machine learning?"
3. User clicks "Ask AI"
4. Frontend sends POST to http://localhost:3001/ask
5. Backend processes with Gemini AI
6. Answer appears on screen
```

## Available Scripts

### `npm start`

Runs the app in development mode on port 3000.
- Open http://localhost:3000 to view it in your browser
- The page will reload when you make changes
- You will also see any lint errors in the console

### `npm test`

Launches the test runner in interactive watch mode.

```bash
npm test
```

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

**Important:** Make sure `.env` has the correct production backend URL before building!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

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
- Error message: "Cannot connect to backend"
- Questions don't get responses
- Browser console shows network errors

**Solutions:**

1. **Verify backend is running on port 3001:**
   ```bash
   curl http://localhost:3001/health
   # Should return: {"status":"healthy",...}
   ```

2. **Check frontend .env has correct backend URL:**
   ```bash
   cat .env
   # Should show: REACT_APP_BACKEND_URL=http://localhost:3001
   ```

3. **Restart frontend after changing .env (MANDATORY):**
   ```bash
   # Stop server with Ctrl+C, then:
   npm start
   ```
   **Note:** React only reads .env variables at startup!

4. **Check browser console for logged backend URL:**
   - Open DevTools (F12) → Console tab
   - Should see: `API Base URL: http://localhost:3001`
   - If different, restart frontend

5. **Verify backend CORS allows localhost:3000:**
   ```bash
   # In backend directory, check .env:
   cat .env | grep CORS_ORIGINS
   # Should include: http://localhost:3000
   ```

### Issue 2: CORS Policy Errors

**Symptoms:**
- Browser console: "blocked by CORS policy"
- Requests fail even though backend is running
- Network tab shows failed requests

**Solutions:**

1. **Check backend CORS configuration:**
   ```bash
   # In backend directory:
   cd ../ai_app_backend
   cat .env | grep CORS_ORIGINS
   # Should be: CORS_ORIGINS=http://localhost:3000
   ```

2. **Restart backend after CORS changes:**
   ```bash
   # Stop backend (Ctrl+C), then:
   uvicorn src.api.main:app --host 0.0.0.0 --port 3001 --reload
   ```

3. **Verify frontend is on port 3000:**
   - Check browser URL bar
   - Should be: http://localhost:3000

4. **Hard refresh browser:**
   - Windows/Linux: Ctrl+Shift+R
   - Mac: Cmd+Shift+R

### Issue 3: Port 3000 Already in Use

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

2. **Or use a different port (not recommended for local dev):**
   ```bash
   PORT=3002 npm start
   ```
   **Note:** If you change frontend port, update backend CORS_ORIGINS!

### Issue 4: Environment Variable Not Working

**Symptoms:**
- REACT_APP_BACKEND_URL changes don't take effect
- Still using old URL

**Solutions:**

1. **Restart development server (REQUIRED):**
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

2. **Verify variable name starts with REACT_APP_:**
   ```bash
   # ✓ Correct:
   REACT_APP_BACKEND_URL=http://localhost:3001
   
   # ✗ Wrong (won't work):
   BACKEND_URL=http://localhost:3001
   ```

3. **Check .env file location:**
   ```bash
   # Should be in frontend root:
   ls -la .env
   ```

4. **No spaces around = sign:**
   ```bash
   # ✓ Correct:
   REACT_APP_BACKEND_URL=http://localhost:3001
   
   # ✗ Wrong:
   REACT_APP_BACKEND_URL = http://localhost:3001
   ```

5. **Check browser console for logged URL:**
   - Should match your .env value
   - If not, server needs restart

### Issue 5: Stray Backend Variables in Frontend .env

**Symptoms:**
- `.env` file contains variables like GEMINI_API_KEY, DATABASE_URL
- Confusion about where variables should be set

**Solution:**

**Frontend `.env` should contain ONLY:**
```bash
REACT_APP_BACKEND_URL=http://localhost:3001
```

**Remove these if present (they belong in backend):**
```bash
# ❌ Remove from frontend .env:
REACT_APP_GEMINI_API_KEY=...
REACT_APP_DATABASE_URL=...
REACT_APP_CORS_ORIGINS=...
REACT_APP_REACT_APP_BACKEND_URL=...  # This is a duplicate/typo
```

Then restart frontend:
```bash
npm start
```

## Local Setup - Port Configuration

**Sanity Check Checklist for Local Development:**

✅ **Frontend Configuration:**
- [ ] Frontend `.env` contains ONLY: `REACT_APP_BACKEND_URL=http://localhost:3001`
- [ ] No backend-specific variables (GEMINI_API_KEY, DATABASE_URL, etc.)
- [ ] Frontend running on port 3000: `npm start`
- [ ] Browser console shows: `API Base URL: http://localhost:3001`

✅ **Backend Configuration:**
- [ ] Backend `.env` contains: `CORS_ORIGINS=http://localhost:3000`
- [ ] Backend running on port 3001: `uvicorn src.api.main:app --host 0.0.0.0 --port 3001`
- [ ] Backend health check works: `curl http://localhost:3001/health`

✅ **After Changes:**
- [ ] Restart frontend after changing frontend `.env`
- [ ] Restart backend after changing backend `.env`
- [ ] Hard refresh browser (Ctrl+Shift+R)

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
# Update .env with production backend URL
echo "REACT_APP_BACKEND_URL=https://your-backend-api.com" > .env

# Build
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment

The `build` folder contains static files that can be deployed to:

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Cloud Platforms**: AWS S3, Google Cloud Storage, Azure Static Web Apps
- **Traditional Hosting**: Any web server (Apache, Nginx)

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
    └── api.js               # Backend API calls (uses REACT_APP_BACKEND_URL)
```

## Development Tips

1. **Hot Reloading**: Changes to `.js` files reload automatically
2. **Console Logging**: Check browser console for debugging
3. **Network Tab**: Monitor API requests in DevTools
4. **React DevTools**: Install browser extension for React debugging
5. **Check Backend URL**: Console logs the backend URL on startup

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

**Note**: This frontend requires the AI Query Assistant backend to be running on port 3001. See the backend README for setup instructions.
