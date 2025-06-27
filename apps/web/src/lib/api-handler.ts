const baseURL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => {
  let token
  try {
    token = JSON.parse(localStorage.getItem('sb-qmhziwpyeqpwllseache-auth-token') ?? '')
  } catch (error) {
    console.error('Error parsing token', error);
  }

  return {
    'Authorization': `Bearer ${token?.access_token}`,
    'RefreshToken': token?.refresh_token,
    'Content-Type': 'application/json'
  };
};

const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  });

  if (!response.ok) {
    let errorMessage = 'Something went wrong';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      console.error('Error parsing error response', e);
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses for DELETE requests or others
  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
    return;
  }

  return response.json();
};

export default fetchApi;
