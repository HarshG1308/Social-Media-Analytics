const API_BASE_URL = 'http://20.244.56.144/evaluation-service'; 
const ACCESS_CODE = 'CNneGT'; 

const aceessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTYyMTUyLCJpYXQiOjE3NDQ5NjE4NTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRjZWY0YThjLTJiYzUtNDhjOC1iMzY1LTNlZDk5N2JhNjE1MCIsInN1YiI6Im5pdGlzaC5rdW1hcl9jczIyQGdsYS5hYy5pbiJ9LCJlbWFpbCI6Im5pdGlzaC5rdW1hcl9jczIyQGdsYS5hYy5pbiIsIm5hbWUiOiJuaXRpc2gga3VtYXIiLCJyb2xsTm8iOiIyMjE1MDAxMTg5IiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiNGNlZjRhOGMtMmJjNS00OGM4LWIzNjUtM2VkOTk3YmE2MTUwIiwiY2xpZW50U2VjcmV0IjoiVkZKQ3VYcnNua1BZRnFaQiJ9.3qUWwLLpAHebNZF4Au8P5NYH-PRCmMsVrlk3bUJwDLg"

export const registerAndGetToken = async () => {
  try {
    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        "email": "duanshi.chawla_cs22@gla.ac.in",
        "name": "Duanshi Chawla",
        "mobileNo": "7088971430",
        "githubUsername": "duanshi-26",
        "rollNo": "2215000729",
        "collegeName": "GLA University",
        accessCode: ACCESS_CODE }),
    });

    if (!registerResponse.ok) {
      const errorDetails = await registerResponse.text();
      throw new Error(`Registration failed: ${errorDetails}`);
    }

    const registerData = await registerResponse.json();

    const authResponse = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: registerData.username,
        password: registerData.password 
      }),
    });

    if (!authResponse.ok) {
      const errorDetails = await authResponse.text();
      throw new Error(`Authentication failed: ${errorDetails}`);
    }

    const authData = await authResponse.json();
    localStorage.setItem('accessToken', authData.token);
    return authData.token;
  } catch (error) {
    console.error('Error in registerAndGetToken:', error);
    throw error;
  }
};

export const getAccessToken = async () => {
  let token = aceessToken;
  
  if (!token) {
    token = await registerAndGetToken();
  }
  
  return token;
};