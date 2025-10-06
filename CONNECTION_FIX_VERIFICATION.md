# Frontend-Backend Connection Fix Verification

**Date:** 2025-01-06  
**Issue:** `net::ERR_CONNECTION_REFUSED` on POST http://localhost:3001/ask  
**Status:** ✅ RESOLVED

## Root Cause Analysis

The issue was caused by the frontend trying to connect to the backend using `http://localhost:3001`, which fails in a cloud/container environment where services need to communicate via public hostnames rather than localhost.

### Environment Details
- **Frontend URL:** https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000
- **Backend URL:** https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001
- **Environment:** Cloud-based containerized deployment

## Changes Made

### 1. Frontend Configuration Update
**File:** `ai-query-assistant-4344/ai_app_frontend/.env`

**Before:**
```
REACT_APP_BACKEND_URL=http://localhost:3001
```

**After:**
```
REACT_APP_BACKEND_URL=https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001
```

### 2. Backend CORS Configuration (Already Correct)
**File:** `ai-query-assistant-4361/ai_app_backend/.env`

The backend CORS was already properly configured to allow requests from both local and deployed frontend:
```
CORS_ORIGINS=http://localhost:3000,https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000
```

### 3. Frontend Dev Server Restart
The React development server was restarted to pick up the new environment variable.

## Verification Tests

### ✅ Backend Process Status
```bash
ps aux | grep uvicorn
# Result: Process running on PID 19390, bound to 0.0.0.0:3001
```

### ✅ Backend Health Check
```bash
curl -s http://localhost:3001/health
# Result: {"status":"healthy","services":{"api":"operational","gemini":"available"},"version":"1.0.0"}
```

### ✅ Backend Public URL Accessibility
```bash
curl -s https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001/health
# Result: HTTP 200 - Backend accessible via public URL
```

### ✅ CORS Preflight Verification
```bash
curl -X OPTIONS https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001/ask \
  -H "Origin: https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000" \
  -H "Access-Control-Request-Method: POST"
  
# Result:
# access-control-allow-origin: https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000
# access-control-allow-methods: DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT
# access-control-allow-credentials: true
```

### ✅ POST /ask Endpoint Test
```bash
curl -X POST https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001/ask \
  -H "Content-Type: application/json" \
  -H "Origin: https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000" \
  -d '{"question":"What is 2+2?"}'
  
# Result:
{
  "answer": "2 + 2 = 4",
  "id": 0,
  "created_at": "2025-10-06T08:33:25.106429"
}
```

### ✅ Frontend Service Status
```bash
curl -s http://localhost:3000 | head -5
# Result: Frontend serving HTML content successfully
```

## Current Service Status

### Backend (ai_app_backend)
- **Status:** ✅ Running
- **PID:** 19390
- **Binding:** 0.0.0.0:3001
- **Public URL:** https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001
- **Health:** Operational
- **Gemini Service:** Available
- **CORS:** Properly configured

### Frontend (ai_app_frontend)
- **Status:** ✅ Running
- **Port:** 3000
- **Public URL:** https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000
- **Backend URL:** https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001 (Updated)
- **Dev Server:** Restarted with new environment variables

## Resolution Summary

The connection issue has been completely resolved by:

1. ✅ Updating `REACT_APP_BACKEND_URL` in frontend `.env` to use the public backend URL
2. ✅ Verifying backend CORS allows the deployed frontend origin
3. ✅ Restarting the frontend dev server to load the new configuration
4. ✅ Testing end-to-end connectivity with CORS headers
5. ✅ Confirming both health and /ask endpoints are accessible

## Testing the Fix

To test the connection from the frontend:

1. Open the frontend at: https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000
2. Enter a question in the input field
3. Click "Ask AI"
4. The frontend will now successfully connect to the backend at the public URL
5. You should receive an AI-generated response without any connection errors

## Notes

- The backend binds to `0.0.0.0:3001`, making it accessible from any interface
- CORS is configured for both local development (`http://localhost:3000`) and deployed environment
- The Gemini API is properly configured and operational
- Database connection is optional and non-blocking (currently not connected, which is expected)
- The fix is minimal and only required updating the frontend environment variable

## Environment Variables Reference

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3001
```

### Backend (.env)
```
GEMINI_API_KEY=AIzaSyD798R-xKZTDjgsmNjvFr-IDRxfcwS1rEk
DATABASE_URL=postgresql+psycopg2://postgres:password@localhost:5432/ai_app_db
CORS_ORIGINS=http://localhost:3000,https://vscode-internal-34006-beta.beta01.cloud.kavia.ai:3000
```

## Conclusion

The `net::ERR_CONNECTION_REFUSED` error was caused by the frontend attempting to connect to `localhost:3001` in a containerized cloud environment. The fix was straightforward:

- Updated the frontend to use the public backend URL
- Verified CORS configuration (already correct)
- Restarted the frontend dev server

Both services are now operational and can communicate successfully. The application is ready for use.
