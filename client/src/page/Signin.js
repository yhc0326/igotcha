import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Login from '../components/Login';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { signIn, signUp } from "../redux/actions/user";
import PropTypes from 'prop-types';

const styles = {
};

class Signin extends Component {
    state = {
        login: true,
        fname: "",
        id: "",
        pw: "",
        pwre: "",
        type: false,
        redirect: false
    }

    onClick = () => {
        this.setState({
            login: !this.state.login
        })
    }

    onLogin = e => {
        e.preventDefault();
        
        this.props.signIn({
            id: this.state.id,
            pw: this.state.pw
        }).then(()=>{
            if(this.props.isAuthenticated) {
                this.setState({
                    redirect: true
                });
            } else {
                alert("Wrong account or password");
            }
        })
    }

    onSignup = e => {
        e.preventDefault();
        
        if(this.state.pw !== this.state.pwre) {
            alert("Passwords do not match.");
            return;
        }

        this.props.signUp({
            id: this.state.id,
            pw: this.state.pw,
            fname: this.state.fname,
            lname: this.state.lname,
            type: this.state.type
        }).then(()=>{
            if(this.props.isAuthenticated) {
                alert("Successfully created an account");
                this.setState({
                    redirect: true
                });
            } else {
                alert("Same Email Address already exists in the server");
            }
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        if(this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div>
                <Container style={{...this.props.styles, marginLeft: "auto"}}>
                    <Login
                        login={this.state.login}
                        onClick={this.onClick}
                        onLogin={this.onLogin}
                        onSignup={this.onSignup}
                        fname={this.state.fname}
                        lname={this.state.lname}
                        id={this.state.id}
                        pw={this.state.pw}
                        type={this.state.type}
                        onChange={this.onChange}
                    />
                </Container>
            </div>
        );
    }
}

Signin.propTypes = {
   signIn: PropTypes.func.isRequired,
   signUp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { signIn, signUp })(Signin);