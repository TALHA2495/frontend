import React from 'react';
import ProductForm from '../../Components/Admin/ProductForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product created successfully!');
        navigate('/admin/dashboard');
      } else {
        toast.error(data.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product');
    }
  };

  return <ProductForm title="Add New Product" onSubmit={handleCreate} isEditing={false} />;
};

export default AddProduct;
