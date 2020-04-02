import React from 'react';
import './BaseInput.css';

export default class BaseInput extends React.Component {
    render() {
        return (
            <div className="BaseInput-box">
                <label htmlFor={this.props.name}>
                    {this.props.label}
                </label>
                <input 
                    id={this.props.name}
                    {...this.props} 
                />
            </div>
        );
    }
}