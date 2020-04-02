import React, { Component } from 'react';
import './UserComment.css';

export default class UserComment extends Component {
    render() {
        const { content, postId, userId, createdAt, id, index, permissions, isAdminComment } = this.props;
        const [week, month, day, year,] = Date(createdAt).split(' ');
        const formattedDate = `${week} ${month} ${day}, ${year}`;
        return (
            <div className='userComment-container'>
                <p className="userComment-username">{isAdminComment ? 'Admin' : 'User'}</p>
                <p className="userComment-date">{formattedDate}</p>
                <p>{content}</p>
                <div className="userComment-button-box">
                    {
                        permissions && (
                            <span>
                                <button 
                                    onClick={() => this.props.removeComment(id, userId)} 
                                    className="secondary-button"
                                >
                                    Remove
                                </button>
                            </span>
                        )

                    }
                    {
                        permissions && (
                            <span>
                                <button 
                                    onClick={() => this.props.editComment(index)}
                                    className="secondary-button"
                                >
                                    Edit
                                </button>
                            </span>
                        )
                    }
                </div>
            </div>
        );
    }
}