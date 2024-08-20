import React, { useState } from 'react';
import './AddProduct.css';
import upload from '../../assets/logosIcons/upload.png';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "mats",
    description: "",
    price: ""
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
    if (!image) {
        errors.push("An image is required.");
    }

    return errors;
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const add_product = async (e) => {
    e.preventDefault();
    const validationErrors = validateProductDetails();
    if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
    }

    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product', image);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
      responseData = await response.json();

      if (responseData.success) {
        product.image = responseData.image_url;
        const productResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        const productData = await productResponse.json();
        if (productData.success) {
          alert("Product Added");
          setProductDetails({
            name: "",
            image: "",
            category: "mats",
            description: "",
            price: ""
          });
          setImage(null);
          setErrors([]);
        } else {
          alert("Failed");
        }      } else {
        console.log("BLAD");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <form className='addproduct' onSubmit={add_product}>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type product`s name' />
      </div>
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='Type product`s price' />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='addproduct-selector'>
          <option value="mats">Mats</option>
          <option value="clothes">Clothes</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <p>Upload image</p><img src={image ? URL.createObjectURL(image) : upload} alt="" />
        </label>
        <input onChange={imageHandler} type='file' name="image" id='file-input' hidden />
      </div>
      <div className="addproduct-itemfield">
        <p>Description</p>
        <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type product`s description' />
      </div>
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, index) => <p key={index} className="error-message">{error}</p>)}
        </div>
      )}
      <button type="submit" className="addproduct-bnt">ADD</button>
    </form>
  );
}

export default AddProduct;
