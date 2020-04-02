import React from 'react';
import './PostView.css'; 
import ReactHtmlParser from 'react-html-parser';       
import { convertNodeToElement } from 'react-html-parser';


function transform(node, index) {
    let acc = ''
    
    if(node.children) {
        node.children.forEach((currNode) => {
            const result = transform(currNode, currNode.index);
            if(result)  {
                acc += result;
            }
        })
    }
    if(node.data) {
        acc += node.data;
    }
   
    if(acc) {
        return acc;
    }

    return null;
}

export default class PostView extends React.Component {
    
    render() {
        
        const { id, title, author, createdAt, body, images } = this.props;
        const [ weekday, month, day, year ] = createdAt.split(' ').slice(0,4);
        const displayDate = `${weekday} ${month} ${day}, ${year}`;
        const parsedBody  = ReactHtmlParser(body, {
            transform
        });

        return (
            <div className="postView-box">

                <div className="postView-createdAt">
                    <span className="postView-createdAt-val">{displayDate}</span>
                </div>

                <div >
                    {
                        images.length > 0 && <img className="postView-image" src={images[0]} />
                    }
                    
                </div>

                <div className="postView-title">
                    {title}
                </div>

                <div className="postView-author">
                    {author ? `By, ${author}` : ''}
                </div>
                
                <div className="postView-body">
                    { 
                        parsedBody.split(' ').length > 100 ? 
                        parsedBody.split(' ').slice(0,100).join(' ') + ' ...' : 
                        parsedBody.join(' ')
                    }
                </div>
                
            </div>
        );
    }
}

// function transform(node, index) {
//     let textContent = '';
//     if(node.children) {
//         node.children.forEach((currNode, subIndex) => {
//             const result = transform(currNode, subIndex);
//             console.log('result', result)
//             if(result) {
//                 textContent += result;
//             }
            
//         })
//     }
//     if(node.data) {
//         textContent += node.data;
//     }
    
//     return textContent;
// }