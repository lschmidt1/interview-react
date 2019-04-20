import React, { Component } from 'react';
import '../../styles/products.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Products extends Component {
  constructor(props){
    super(props);
  this.state = {
    products: [],
    searchString: "",
    error:"",
    loading: true,
  }
  this.handleChange = this.handleChange.bind(this);
}

  getProducts(){
    return axios.get(`http://localhost:3000/products`)
      .then(res => {
        const products = res.data;
        this.setState({ 
          products,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ 
          error,
          loading: false,
         });
    });
  }

  componentDidMount() {
    this.getProducts()
}

  handleChange(){
    this.setState({
      searchString: this.refs.search.value
    });
  }


  render() {
    const { products } = this.state
    let search = this.state.searchString.trim().toLowerCase();
    let _products = products 
    if (search.length > 0){
      _products = _products.filter(function(product){
        return product.name.toLowerCase().match(search);
      });
    }
    return (
      <div className="products">
        <header className="productsHeader">
          <h1 className="headerTitle">OUR PRODUCTS</h1>
          <input
            className="searchInput"
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="Search products"
          />
        </header>
        <section >
          <div >
            <ul className="productsList">
              {_products.map(product =>
                <li className="productCard"> 
                  <div className="productCard">
                    <h4 id="name">
                    {product.name} 
                    </h4>
                    <h6 id="description">
                      <br/>
                      ID: {product.id}
                      <br/>
                      DESCRIPTION: {product.description}
                      <br/>
                      PRICE: {product.price}$
                    </h6>
                    <Link to={"/products/" + product.id} style={{textDecoration: "none"}}>
                      <button id="detailsButton">Specifications</button>
                    </Link>
                  </div> 
                  {/* <img className="img" src={broken_img} alt="broken img"/> */}
                </li>
              )}
            </ul>
            <br/>
            <h3 hidden={!this.state.loading}>Loading...</h3>
            <h4 hidden={!this.state.error}>An error has ocurred</h4>
          </div>
        </section>
      </div>
    );
  }
}

export default Products;