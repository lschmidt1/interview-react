import React, { Component } from "react";
import "../../styles/products.css";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../Components/NavBar";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchString: "",
      error: "",
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getProducts() {
    return axios
      .get(`http://localhost:3000/products`)
      .then(res => {
        const products = res.data;
        this.setState({
          products,
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

  componentDidMount() {
    this.getProducts();
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  render() {
    const { products } = this.state;
    let search = this.state.searchString.trim().toLowerCase();
    let _products = products;
    if (search.length > 0) {
      _products = _products.filter(function(product) {
        return product.name.toLowerCase().match(search);
      });
    }
    return (
      <div>
        <NavBar active="products" />
        <header className="productsHeader">
          <h1 className="headerTitle">TAKE A LOOK AT OUR NEWEST PRODUCTS!</h1>
          <input
            className="searchInput"
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="Search products..."
          />
        </header>
        <section>
          <div>
            <ul className="productsList">
              {_products.map(product => (
                <li className="productCard">
                  <div class="card">
                    <Link to={"/products/" + product.id}>
                      <img
                        src={require(`../../styles/Images/${
                          product.image
                        }.jpg`)}
                        alt="product"
                        className="productImage"
                      />
                    </Link>
                    <h3 id="name">{product.name}</h3>
                    <h5 id="id">ID: {product.id}</h5>
                    <p id="description">{product.description}</p>
                    <Link to={"/productDetail/" + product.id}>
                      <button id="price">{product.price}$</button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <br />
            <h2 hidden={!this.state.loading} className="loading">
              LOADING...
            </h2>
            <h2 hidden={!this.state.error} className="loading">
              AN ERROR HAS OCURRED! :(
            </h2>
          </div>
        </section>
      </div>
    );
  }
}

export default Products;
