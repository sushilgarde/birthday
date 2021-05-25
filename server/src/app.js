
const path = require('path');
const uuid = require('uuid')
const PORT = process.env.PORT || 3000

const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors())

const serveStatic = require('serve-static');

const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

const axios = require('axios')


const {addUser, removeUser, getUser, getUserInRoom, addComment, getComments, getToImproves, getActionItems, incrLike, decrLike, deleteComment, correctDataAfterDrag, editedComment, mergeComment, flushData, getAllUsers} = require('../utils/users');


app.use('/', serveStatic(path.join(__dirname, '../../client/dist')));
app.use('/add-greeting', serveStatic(path.join(__dirname, '../../client/dist')));
app.use('/joinsession/:id/:sessionid', serveStatic(path.join(__dirname, '../../client/dist')));

app.use(express.json())
require('./db/mongoose')

const router = require('./router/routes');
const { default: Axios } = require('axios');
app.use(router)

  

io.on('connection', function(socket){
    socket.on('join', ({username, sessionId, userId}, callback)=>{
        // const {error, user} = addUser({id: socket.id, username, sessionId})
        // if(error){
        //     return callback(error);
        // }
        
        // axios.patch('http://localhost:3000/user/'+userId, {socketId: socket.id})
        axios.patch('https://retroboard.online/user/'+userId, {socketId: socket.id})
        .then(()=>{

        })
        .catch(()=>{
            
        })

        socket.join(sessionId);
        //console.log(`${user.username} has joined sessionId ${user.sessionId}`);
        console.log("Connection "+sessionId+" "+username+" "+new Date())

        io.to(sessionId).emit('roomData', {
           user: username
        })


        //>>>>>>>>>>>>>>>>>>>TO BE CHECKED
        // const comments = getComments(user.sessionId)
        // const toImproves = getToImproves(user.sessionId)
        // const actionItems = getActionItems(user.sessionId)
        
        socket.emit('setData')

        callback(); 
    })

    socket.on('newComment', function(comment){
        //const user = getUser(socket.id); 
        //const newComment = addComment({id:uuid.v4(), sessionId:user.sessionId, text: comment.text, user: comment.user, like:comment.like, context:comment.context});

        socket.broadcast.to(comment.sessionId).emit('newComment', {comment}, comment.context)


        // if(user)
        // io.to(user.sessionId).emit('newComment', {
        //     newComment
        // }, comment.context)

        // if(user)
        // socket.broadcast.to(user.sessionId).emit('newComment', {
        //     newComment
        // }, comment.context)
    })

    socket.on('incrementLike', function(id, sessionId){
        //incrLike(id, context);
        //const user = getUser(socket.id); 

        if(sessionId)
        io.to(sessionId).emit('incrementLike', id)
    })

    socket.on('decrementLike', function(id, sessionId){
        // decrLike(id, context);
        // const user = getUser(socket.id); 

        if(sessionId)
        io.to(sessionId).emit('decrementLike', id)
    })


    socket.on('removeComment', function({id, sessionId}){
        // deleteComment(id, context);
        // const user = getUser(socket.id); 

        if(sessionId)
        io.to(sessionId).emit('deleteComment', id)
    })

    socket.on('dragged', function({id, sessionId, text, user, like, draggedTo, draggedFrom}){
        const userD = getUser(socket.id); 

        if(sessionId){
            // let sessionId = userD.sessionId;
            // correctDataAfterDrag(id, text, user, like, sessionId, draggedTo, draggedFrom);
            
            socket.broadcast.to(sessionId).emit('correctDataAfterDrag', {id, text, user, like, sessionId, draggedTo, draggedFrom})
            // io.to(userD.sessionId).emit('correctDataAfterDrag', {id, text, user, like, sessionId, draggedTo, draggedFrom})
        }
    })

    socket.on('editedComment', function({id, sessionId, text}){
        // editedComment(id, text, context);
        // const user = getUser(socket.id); 

        if(sessionId)
        socket.broadcast.to(sessionId).emit('editedComment', {id, text})
    })

    socket.on('socketSettingsChanged', function({maxLikes, sessionId}){
        if(sessionId)
        io.to(sessionId).emit('socketSettingsChanged', {maxLikes})
    })

    socket.on('hideComments', function(sessionId){

        if(sessionId)
        io.to(sessionId).emit('hideComments')
    })

    socket.on('showComments', function(sessionId){

        if(sessionId)
        io.to(sessionId).emit('showComments')
    })
    
    //TOImproves
    socket.on('hideToImproves', function(sessionId){

        if(sessionId)
        io.to(sessionId).emit('hideToImproves')
    })

    socket.on('showToImproves', function(sessionId){

        if(sessionId)
        io.to(sessionId).emit('showToImproves')
    })

    
    //ActionItems
    socket.on('hideActionItems', function(sessionId){

        if(sessionId)
        io.to(sessionId).emit('hideActionItems')
    })

    socket.on('showActionItems', function(sessionId){

        if(sessionId)
        io.to(sessionId).emit('showActionItems')
    })
    
    socket.on('hideLikes', function(sessionId){ 

        if(sessionId)
        io.to(sessionId).emit('hideLikes')
    })

    socket.on('showLikes', function(sessionId){

        if(sessionId)
        io.to(sessionId).emit('showLikes')
    })

    socket.on('mergeComment', function({sessionId, targetCardId, targetCardText, sourceCardId, text, targetCardUser, user, draggedTo, draggedFrom}){
        // mergeComment(targetCardId, targetCardText, sourceCardId, text, targetCardUser, user, draggedTo, draggedFrom);
        // const userD = getUser(socket.id); 

        if(sessionId)
        socket.broadcast.to(sessionId).emit('mergeComment', {targetCardId, targetCardText, sourceCardId, text,targetCardUser, user, draggedTo, draggedFrom})
        //io.to(user.sessionId).emit('mergeComment', {targetCardId, targetCardText, sourceCardId, text, draggedTo, draggedFrom});
    })

    socket.on('flushData', function(){
        flushData();
    })

    socket.on('getSessionIds', function(){
        const users = getAllUsers();

        if(users)
        socket.emit('storeSessionIds', users);
    })

    socket.on('setFirstBoxTitle', function(title, sessionId){
    
        if(sessionId)
        socket.broadcast.to(sessionId).emit('setFirstBoxTitle', title)
    })

    socket.on('setSecondBoxTitle', function(title, sessionId){
        if(sessionId)
        socket.broadcast.to(sessionId).emit('setSecondBoxTitle', title)
    })


    socket.on('setThirdBoxTitle', function(title, sessionId){
        if(sessionId)
        socket.broadcast.to(sessionId).emit('setThirdBoxTitle', title)
    })

    socket.on('newBoardName', function(sessionId, boardName){
        if(sessionId){
            socket.broadcast.to(sessionId).emit('newBoardName', boardName)
        }
    })

    socket.on('colorsChanged', function({sessionId, label1_color, label2_color, label3_color}){
        // console.log('label1 '+label1_color);
        // console.log('label2 '+label2_color);
        // console.log('label3 '+label3_color);
        // console.log('Session Id ', sessionId);
        if(sessionId){
            io.to(sessionId).emit('colorsChanged', {
                label1_color,
                label2_color,
                label3_color
            })
        }

    })

    socket.on("disconnect", function(){
        //const user = removeUser(socket.id);
        // axios.patch('http://localhost:3000/userbysocketId/'+socket.id, {connected: false})
        axios.patch('https://retroboard.online/userbysocketId/'+socket.id, {connected: false})
        .then((res)=>{
            if(res.data && res.data.isAdmin)
                socket.broadcast.to(res.data.sessionId).emit('hostDisconnected');
            
            if(res.data && !res.data.isAdmin){
                io.to(res.data.sessionId).emit('removeUser', {
                    user: res.data.name
                })
            }
        })
        .catch(()=>{
            
        })
    })
})


server.listen(PORT, function(){
  return console.log('Running on port '+PORT);
})