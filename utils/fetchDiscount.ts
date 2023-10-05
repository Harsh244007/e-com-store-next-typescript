export const fetchDiscount = async (code: string) => {
    try {
      const response = await fetch(`/api/routes/getDiscount?discount=${code}`);
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
  