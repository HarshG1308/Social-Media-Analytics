import { getAccessToken } from './auth';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service'; 

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
    const data = await response.json();

    
    return data
  } catch (error) {
    console.error(`Error in fetchWithAuth for endpoint ${endpoint}:`, error);
    throw error;
  }
};

export const getPosts = async (id) => {
  return fetchWithAuth(`/users/${id}/posts`);
};

export const getComments = async (id) => {
  return fetchWithAuth(`/posts/${id}/comments`);
};

export const getUsers = async () => {
  return fetchWithAuth('/users');
};

