const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const app = express();

//mongoose.connect('mongodb://localhost:27017/blog');
mongoose.connect('mongodb://admin:a12345@ds159100.mlab.com:59100/web-blog');

const postsSchema = mongoose.Schema({
	user: String,
  	title: String,
	  content: String,
	  time: String,
});

const Posts = mongoose.model('Posts', postsSchema);

const server = app.listen(process.env.PORT || 5000, () => {
  	console.log('server is running on port 5000');
});

app.use(express.static('../../build'));

const io = socket(server);

const userList = [
  	{ username: 'admin', password: '123' , age: '20'},
];


io.on('connection', (socket) => {
  	console.log(`Socket ID: ${socket.id} connected`);
  

  	socket.on('LOGIN', (data) => {
		let user = userList.find(function(e) {
	  		return e.username === data.username;
		});
		if ( user && user.password === data.password){
	  		io.emit('RECEIVE_LOGIN', data.username);
		} else {
	  		io.emit('LOGIN_ERROR');
		}
  	});

  	socket.on('REGISTER', (data) => {
		let user = userList.find(function(e) {
	  		return e.username === data.username;
		});
		if( user ) {
	  		io.emit('ACCOUNT_EXIST');
	 		console.log('account exist error');
		} else {
	  		io.emit('RECEIVE_REGISTER');
	  		console.log('registration success');
	  		userList.push(data);      
		}
  	});

  	socket.on('LOGOUT', () => {
		io.emit('RECEIVE_LOGOUT');
  	});

  	socket.on('NEW_POST', (data) => {
		const newPosts = new Posts({
	  		user: data.user,
	  		title: data.title,
			content: data.content,
			time: data.time,  
		});

	newPosts.save();
  	});

  	socket.on('GET_POST', () => {
		var query = Posts.find();
		var post_list = [];
	
		query.exec(function(err,posts){

	  		if(err) return console.log(err);
		  
			posts.forEach(function(post){
				post_list.push({
					_id: post._id,
					user: post.user,
					title: post.title,
					content: post.content,
					time: post.time,
				})
			});

	  	io.emit('RECEIVE_POST', (post_list));
		});
	});

	socket.on('GET_POST_BY_ID', (id) => {
		var query = Posts.find({_id: id});
		var thePost = null;
	
		query.exec(function(err,posts){

			if(err) return console.log(err);
		  
			posts.forEach(function(post){
				thePost = {
					_id: post._id,
		   			user: post.user,
		   			title: post.title,
					content: post.content,
					time: post.time,
				};
			});
			io.emit('RECEIVE_POST_BY_ID', (thePost));
		});
	});
	  
	  
});

