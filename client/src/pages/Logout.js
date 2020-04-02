import React, { Component } from 'react';
import store from 'store2';

class Logout extends Component {
    componentDidMount = async () => {
        
        await store.set('authToken', '');
        this.props.logout();
        
        this.props.history.push('/');
    }
    render() {
        return (null);
    }
}

export default (logout) => (props) => (
    <Logout logout={logout} {...props} />
);