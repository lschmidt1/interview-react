import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../Components/NavBar'
import '../../styles/homePage.css';

import { userActions } from '../../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user} = this.props;
        return (
            <div>
                <NavBar active="home"/>
                <div >
                <h3 className="welcome">Welcome, {user.firstName}</h3>
                </div>
                <div >
                <p className="welcomeMessage">Please, go to our products section to start browsing through our awesome stuff!</p>
                </div>
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };