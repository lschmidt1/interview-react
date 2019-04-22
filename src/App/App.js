import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/App.css";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../views/HomePage";
import { LoginPage } from "../views/LoginPage";
import Products from "../views/ProductsPage/Products";
import ProductDetail from "../views/ProductsPage/ProductDetail";
import { RegisterPage } from "../views/RegisterPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="container">
        <div>
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/productDetail/:id" component={ProductDetail} />
              <Route path="/products" component={Products} />
              <Route path="/register" component={RegisterPage} />
            </div>
          </Router>
          {alert.message && <div className="alertMessage">{alert.message}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
