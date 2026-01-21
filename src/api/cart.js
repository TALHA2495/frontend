const BASE_URL = 'https://backend-topaz-one-89.vercel.app/api/cart';
// Note: In a real app, you'd use an env var for the base URL.
// But I'll stick to the one used in AuthContext for consistency.

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const cartAPI = {
    getCart: async () => {
        const response = await fetch(`${BASE_URL}/all`, {
            headers: getAuthHeaders()
        });
        return response.json();
    },

    addToCart: async (productData) => {
        const response = await fetch(`${BASE_URL}/add`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                productId: productData._id,
                quantity: productData.quantity || 1,
                name: productData.name,
                price: productData.price,
                image: productData.image || (productData.images && productData.images[0])
            })
        });
        return response.json();
    },

    updateQuantity: async (productId, quantity) => {
        const response = await fetch(`${BASE_URL}/update`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ productId, quantity })
        });
        return response.json();
    },

    removeFromCart: async (productId) => {
        const response = await fetch(`${BASE_URL}/remove/${productId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return response.json();
    },

    syncCart: async (items) => {
        const response = await fetch(`${BASE_URL}/sync`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ items })
        });
        return response.json();
    },

    clearCart: async () => {
        const response = await fetch(`${BASE_URL}/clear`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return response.json();
    }
};
