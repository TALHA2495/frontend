import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import ProductList from './Pages/ProductList';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ProtectedRoute from './Components/Admin/ProtectedRoute';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AddProduct from './Pages/Admin/AddProduct';
import EditProduct from './Pages/Admin/EditProduct';
import { Navigate } from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
      <ToastContainer position='bottom-right' />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<ProductList />} />
          <Route path="category/:categoryName" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          {/* Fallback */}
          <Route path="cart" element={<Cart />} />
        </Route>
        
        <Route path='/register' element={<Register/>}  />
        <Route path='/login' element={<Login/>} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
