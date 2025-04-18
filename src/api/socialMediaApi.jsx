import { getAccessToken } from './auth';

const API_BASE_URL = 'https://test-server.com/api'; // Replace with actual test server URL

const fetchWithAuth = async (endpoint) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`API error: ${response.status} - ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error in fetchWithAuth for endpoint ${endpoint}:`, error);
    throw error;
  }
};

export const getPosts = async () => {
  return fetchWithAuth('/posts');
};

export const getComments = async () => {
  return fetchWithAuth('/comments');
};

export const getUsers = async () => {
  return fetchWithAuth('/users');
};

