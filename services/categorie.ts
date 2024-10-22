export const fetchCategorie = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_LIST_API}categories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    return categories;
  } catch (err) {
    throw new Error("Failed to fetch categories");
  }
};
