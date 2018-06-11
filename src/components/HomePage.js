import React, { Component } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
        this.socket = this.props.socket;

        this.socket.emit('GET_POST');
        
        this.socket.on('RECEIVE_POST', (data) => {
            this.setState({ posts: data});
        });
    }
    render() {
        let card_list = [];
        if (this.state.posts.length === 0){
            card_list.push(<a id="no">No Post Yet</a>);
        } else {
            for (let i=0; i<this.state.posts.length; ++i){
                card_list.push(
                    <div class="card">
                        <img class="card-img-top" src="..." alt="img"/>
                        <div class="card-body">
                            <h5 class="card-title">{this.state.posts[i].title}</h5>
                            <p class="card-text">{this.state.posts[i].content}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">{this.state.posts[i].user}</small>
                        </div>
                    </div>
                )
            }
        }
        
        
        return (
            <div class="container-scroll">
                <div class="d-flex flex-row flex-now">
                    {card_list}
                </div>
            </div>
        );
    }
}

export default HomePage;