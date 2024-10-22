export const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_LIST_API}products`,
      {
        headers: {
          "Content-Type": "application/json", // Example header
        },
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
