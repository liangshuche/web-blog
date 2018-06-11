import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './PostPage.css';
class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        }

        this.socket = this.props.socket;

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleTitleChange(ev) {
        this.setState({title: ev.target.value});
    }

    handleContentChange(ev) {
        this.setState({content: ev.target.value});
    }

    handleOnClick() {
        this.setState({
            title: '',
            content: '',
        });
        this.socket.emit('NEW_POST', {
            user: this.props.username,
            title: this.state.title,
            content: this.state.content,
        });
        
    }
    render() {
        if( 1 ) {
        //if( this.props.login) {
            return (
                <div>
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <p class="lead">Write a new post</p>                    
                        </div>
                    </div>
                
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col-8'>
                            <div class="form-group">
                                <label >Title:</label>
                                <input type="text" class="form-control" id="title" value={this.state.title} onChange={this.handleTitleChange}></input>
                                <br/>
                                <label >Content:</label>
                                <textarea class="form-control" style={{resize: 'none'}}rows='10' id="content" value={this.state.content} onChange={this.handleContentChange}></textarea>
                            </div>
                        </div>
                        <div className='col-2'></div>
                    </div>
                    <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'>
                            <button onClick={this.handleOnClick} className="btn btn-outline-secondary btn-lg btn-block">Post</button>        
                        </div>
                        <div className='col-4'></div>                        
                    </div>
                </div>
            )
        }
        return (
            <Redirect push to='/login'/>
        );
    }
}

export default PostPage;