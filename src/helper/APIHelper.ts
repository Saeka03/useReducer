const API_URL: string = "https://fakestoreapi.com/products";

export const getProducts = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    const error = {
      error: response.status,
      message: response.statusText,
    };
    throw new Error(JSON.stringify(error));
  }
  return await response.json();
};
