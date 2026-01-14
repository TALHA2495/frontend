import React, { useEffect, useState } from 'react';
import ProductForm from '../../Components/Admin/ProductForm';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/singleProduct/${id}`);
        const data = await response.json();
        if (data.success) {
          setProductData(data.data);
        } else {
          toast.error('Failed to fetch product details');
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8000/product/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product updated successfully!');
        navigate('/admin/dashboard');
      } else {
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

  if (loading) return <div>Loading...</div>;

  return <ProductForm title="Edit Product" initialData={productData} onSubmit={handleUpdate} isEditing={true} />;
};

export default EditProduct;
