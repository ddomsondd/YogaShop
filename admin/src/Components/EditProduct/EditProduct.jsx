// EditProduct.jsx

import React, { useState, useEffect } from 'react';
import './EditProduct.css';
import upload from '../../assets/logosIcons/upload.png';

const EditProduct = ({ product, fetchInfo }) => {
  const [image, setImage] = useState(product.image);
  const [productDetails, setProductDetails] = useState({
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
  });
  const [errors, setErrors] = useState([]);

  const validateProductDetails = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const errors = [];

    if (!nameRegex.test(productDetails.name)) {
      errors.push("Product name can only contain letters and spaces.");
    }
    if (!priceRegex.test(productDetails.price)) {
      errors.push("Price must be a valid number.");
    }
    if (productDetails.description.trim() === "") {
      errors.push("Description is required.");
    }

    return errors;
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const edit_product = async (e) => {
    e.preventDefault();
    const validationErrors = validateProductDetails();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    let formData = new FormData();
    formData.append('product', image); // 'image' jest plikiem lub URL obrazu

    try {
      const response = await fetch(`http://localhost:4000/upload`, {
        method: 'POST',
        body: formData,
      });
      const responseData = await response.json();

      if (responseData.success) {
        const updatedProduct = {
          ...productDetails,
          image: responseData.image_url || image,
        };

        const productResponse = await fetch(`http://localhost:4000/editproduct/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });

        const productData = await productResponse.json();
        if (productData.success) {
          alert("Product Edited");
          fetchInfo(); // Odświeżenie listy produktów po edycji
        } else {
          alert("Failed to edit product");
        }
      } else {
        console.log("Error uploading image");
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
};


  return (
    <form className='editproduct' onSubmit={edit_product}>
      <div className="editproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type product`s name' />
      </div>
      <div className="editproduct-itemfield">
        <p>Price</p>
        <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='Type product`s price' />
      </div>
      <div className="editproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='editproduct-selector'>
          <option value="mats">Mats</option>
          <option value="clothes">Clothes</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      <div className="editproduct-itemfield">
        <label htmlFor="file-input">
          <p>Upload image</p><img src={image ? (typeof image === 'string' ? image : URL.createObjectURL(image)) : upload} alt="" />
        </label>
        <input onChange={imageHandler} type='file' name="image" id='file-input' hidden />
      </div>
      <div className="editproduct-itemfield">
        <p>Description</p>
        <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type product`s description' />
      </div>
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, index) => <p key={index} className="error-message">{error}</p>)}
        </div>
      )}
      <button type="submit" className="editproduct-bnt">SAVE</button>
    </form>
  );
}

export default EditProduct;
