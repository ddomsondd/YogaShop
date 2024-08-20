import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import EditProduct from '../EditProduct/EditProduct';
import remove from '../../assets/logosIcons/bin.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo();
  };

  const editProduct = (id) => {
    setEditProductId(id);
  };

  const cancelEdit = () => {
    setEditProductId(null);
  };

  const handleProductEdited = () => {
    fetchInfo();
    setEditProductId(null);
  };

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Description</p>
        <p>Actions</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <div key={product.id} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            {editProductId === product.id ? (
              <div className="edit-product-form">
                <EditProduct product={product} fetchInfo={handleProductEdited} />
                <button onClick={cancelEdit} className="edit-btn">Cancel</button>
              </div>
            ) : (
              <div className="listproduct-actions">
                <button onClick={() => editProduct(product.id)} className="edit-btn">Edit</button>
                <img onClick={() => removeProduct(product.id)} src={remove} alt="" className="listproduct-remove-icon" />
              </div>
            )}
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}

export default ListProduct;
