import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/loginPage.css';

import { userActions } from '../../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password && user.email) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="App">
                <h2 className="loginTitle">Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'Input' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName" className="lblText">First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} />
                    </div>
                    {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    <div className={'Input' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName" className="lblText">Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={this.handleChange} />
                    </div>
                    {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    <div className={'Input' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username" className="lblText">Username</label>
                        <input type="text" name="username" value={user.username} onChange={this.handleChange} />
                    </div>
                    {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    <div className={'Input' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password" className="lblText">Password</label>
                        <input type="password" name="password" value={user.password} onChange={this.handleChange} />
                        
                    </div>
                    {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    <div className={'Input' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email" className="lblText">Email</label>
                        <input type="email" name="email" value={user.email} onChange={this.handleChange} />
                    </div>
                    {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    <div className="form-group">
                        <button className="loginBtn">Register</button>
                        {registering && 
                            <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                            <Link to="/login">
                            <button className="registerBtn">
                            Cancel
                        </button></Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };