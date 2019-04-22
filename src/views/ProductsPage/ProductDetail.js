import React, { Component } from "react";
import "../../styles/productDetail.css";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import axios from "axios";

class ProductDetail extends Component {
  state = {
    name: null,
    sku: null,
    price: null,
    image: null,
    description: null,
    category: null,
    size: null,
    brand: null,
    stock: null,
    error: "",
    loading: true
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.getProductDetail(id);
  }

  getProductDetail(id) {
    return axios
      .get(`http://localhost:3000/products/${id}`)
      .then(res => {
        const {
          name,
          sku,
          price,
          image,
          description,
          category,
          size,
          brand,
          stock
        } = res.data;
        this.setState({
          name,
          sku,
          price,
          image,
          description,
          category,
          size,
          brand,
          stock,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error,
          loading: false
        });
      });
  }

  render() {
    const {
      sku,
      name,
      price,
      image,
      description,
      category,
      size,
      brand,
      stock
    } = this.state;
    console.log(brand);
    return (
      <div className="productDetails">
        <NavBar active="products" />
        <div className="detail" hidden={this.state.loading}>
          <header className="detailsHeader">
            <Link to="/products">
              <button className="backButton">{"<"}</button>
            </Link>
            <h1 className="productTitle"> {name}</h1>
          </header>
          <div className="product">
            <img src={image} alt="product" className="productImage" />
            <ul className="details">
              <li>Code: {sku}</li>
              <li>Category: {category}</li>
              <li>Description: {description}</li>
              <li>Price: {price}$</li>
              <li>Size: {size}</li>
              <li>Brand: {brand}</li>
              <li>Stock: {stock}</li>
            </ul>
          </div>
        </div>
        <h2 hidden={!this.state.loading} className="loading">
          LOADING...
        </h2>
        <h2 hidden={!this.state.error} className="loading">
          AN ERROR HAS OCURRED! :(
        </h2>
      </div>
    );
  }
}

export default ProductDetail;
