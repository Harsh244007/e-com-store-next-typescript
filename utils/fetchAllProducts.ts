export const fetchProducts = async (page: number) => {
  try {
    const response = await fetch(`/api/routes/getAllProducts?page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
