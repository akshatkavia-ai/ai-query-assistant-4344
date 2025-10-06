#!/bin/bash
# Setup Verification Script for AI Query Assistant Frontend
# This script verifies that the frontend is properly configured

echo "===================================================="
echo "AI Query Assistant Frontend - Setup Verification"
echo "===================================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: .env file exists
echo "1. Checking .env file..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${RED}✗${NC} .env file not found"
    echo "   Run: cp .env.example .env"
    exit 1
fi

# Check 2: REACT_APP_BACKEND_URL is set
echo ""
echo "2. Checking REACT_APP_BACKEND_URL..."
if grep -q "REACT_APP_BACKEND_URL=http://localhost:3001" .env; then
    echo -e "${GREEN}✓${NC} REACT_APP_BACKEND_URL is set to http://localhost:3001"
else
    echo -e "${RED}✗${NC} REACT_APP_BACKEND_URL should be http://localhost:3001"
    echo "   Current value:"
    grep "REACT_APP_BACKEND_URL" .env || echo "   Not set"
fi

# Check 3: No backend variables in frontend .env
echo ""
echo "3. Checking for incorrect environment variables..."
ISSUES=0
if grep -q "GEMINI_API_KEY" .env; then
    echo -e "${RED}✗${NC} GEMINI_API_KEY should not be in frontend .env (belongs in backend)"
    ISSUES=$((ISSUES+1))
fi
if grep -q "DATABASE_URL" .env; then
    echo -e "${RED}✗${NC} DATABASE_URL should not be in frontend .env (belongs in backend)"
    ISSUES=$((ISSUES+1))
fi
if grep -q "CORS_ORIGINS" .env; then
    echo -e "${RED}✗${NC} CORS_ORIGINS should not be in frontend .env (belongs in backend)"
    ISSUES=$((ISSUES+1))
fi
if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No backend-specific variables in frontend .env"
fi

# Check 4: node_modules exists
echo ""
echo "4. Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules directory exists"
else
    echo -e "${RED}✗${NC} node_modules not found"
    echo "   Run: npm install"
fi

# Check 5: Port 3000 availability
echo ""
echo "5. Checking port 3000..."
if netstat -tuln 2>/dev/null | grep -q ":3000"; then
    echo -e "${GREEN}✓${NC} Frontend is running on port 3000"
else
    echo -e "${YELLOW}⚠${NC} Frontend is not running on port 3000"
    echo "   Start it with: npm start"
fi

# Check 6: Backend connectivity
echo ""
echo "6. Testing backend connectivity..."
BACKEND_URL=$(grep "REACT_APP_BACKEND_URL" .env | cut -d'=' -f2)
if [ -n "$BACKEND_URL" ]; then
    if curl -s -f "$BACKEND_URL/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Backend at $BACKEND_URL is reachable"
    else
        echo -e "${RED}✗${NC} Cannot reach backend at $BACKEND_URL"
        echo "   Make sure backend is running on port 3001"
    fi
else
    echo -e "${YELLOW}⚠${NC} REACT_APP_BACKEND_URL not set"
fi

echo ""
echo "===================================================="
echo "Verification Complete"
echo "===================================================="
