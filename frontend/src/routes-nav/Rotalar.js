import React from "react";
import {Routes, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../login/RegisterForm";
import ProductDetail from "../product/ProductDetail";
import Product from "../product/Product";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ProductCart from "../product/ProductCart";
import ProductAdmin from "../product/ProductAdmin";
import SavedShow from "../product/SavedShow";
import ProfileForm from "../users/ProfileForm";

function Rotalar({ login, signup }) {
  return (
    <div>
      <Routes>
        <Navigate to="/" >
          <Homepage />
          </Navigate>

        <Navigate to="/login">
          <LoginForm login={login} />
          </Navigate>

        <Navigate to="/signup">
          <RegisterForm signup={signup} />
        </Navigate>

        <Navigate to="/products/:username/saved">
          <SavedShow />
        </Navigate>

        <Navigate to="/products">
          <Product />
        </Navigate>

        <PrivateRoute exact path="/products/cart">
          <ProductCart />
        </PrivateRoute>

        <AdminPrivateRoute exact path="/products/admin">
          <ProductAdmin />
        </AdminPrivateRoute>

        <PrivateRoute exact path="/products/:id">
          <ProductDetail />
        </PrivateRoute>

        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <Navigate to="/" />
      </Routes>
    </div>
  );
}

export default Rotalar;