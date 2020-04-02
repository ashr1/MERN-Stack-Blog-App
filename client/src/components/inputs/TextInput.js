import React from 'react';
import BaseInput from './BaseInput';

export default class TextInput extends React.Component {
    render() {
        return (
            <BaseInput 
                {...this.props}
                type="text"
            />
        );
    }
}