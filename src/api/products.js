const API_URL = "http://localhost:8000/product";

export const productAPI = {
  // Get all products with optional category filter
  getAll: async (category = null) => {
    try {
      let url = `${API_URL}/all`;
      if (category) {
        url += `?category=${encodeURIComponent(category)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      return data.data || [];
    } catch (error) {
      console.error("Get products error:", error);
      return [];
    }
  },

  // Get single product by ID
  getOne: async (id) => {
    try {
      const res = await fetch(`${API_URL}/singleProduct/${id}`);
      const data = await res.json();
      return data.data || null;
    } catch (error) {
      console.error("Get product error:", error);
      return null;
    }
  },

  // Create multiple products (seed)
  create: async (products) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });
      return await res.json();
    } catch (error) {
      console.error("Create products error:", error);
    }
  },

  // Update product
  update: async (id, product) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      return await res.json();
    } catch (error) {
      console.error("Update product error:", error);
    }
  },

  // Delete product
  remove: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      return await res.json();
    } catch (error) {
      console.error("Delete product error:", error);
    }
  },
};
