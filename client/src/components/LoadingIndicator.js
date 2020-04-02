import React, { Component } from 'react';
import './LoadingIndicator.css';

export default class LoadingIndicator extends Component {
    render() {
        return (
            <div className="LoadingIndicator">
              
                <div className="LoadingDot1"></div>
                <div className="LoadingDot2"></div>
                <div className="LoadingDot3"></div>

            </div>
        );
    }
}