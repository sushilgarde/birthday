
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


const {addUser, removeUser, getUser, getUserInRoom, addComment, getComments, getToImproves, getActionItems, incrLike, decrLike, deleteComment, correctDataAfterDrag, editedComment, mergeComment, flushData, getAllUsers} = require('./utils/users');


app.use('/', serveStatic(path.join(__dirname, '../client/dist')));
app.use('/session/:id', serveStatic(path.join(__dirname, '../client/dist')));
app.use('/joinsession/:id/:sessionid', serveStatic(path.join(__dirname, '../client/dist')));
  

io.on('connection', function(socket){
    socket.on('join', ({username, sessionId}, callback)=>{
        const {error, user} = addUser({id: socket.id, username, sessionId})
        if(error){
            return callback(error);
        }
        socket.join(user.sessionId);
        //console.log(`${user.username} has joined sessionId ${user.sessionId}`);
        console.log("Connection "+user.sessionId+" "+user.username+" "+new Date())

        io.to(user.sessionId).emit('roomData', {
           user: username
        })
        const comments = getComments(user.sessionId)
        const toImproves = getToImproves(user.sessionId)
        const actionItems = getActionItems(user.sessionId)
        
        socket.emit('setData', {comments, toImproves, actionItems})

        callback(); 
    })

    socket.on('newComment', function(comment){
        const user = getUser(socket.id); 
        const newComment = addComment({id:uuid.v4(), sessionId:user.sessionId, text: comment.text, user: comment.user, like:comment.like, context:comment.context});
       
        if(user)
        io.to(user.sessionId).emit('newComment', {
            newComment
        }, comment.context)

        // if(user)
        // socket.broadcast.to(user.sessionId).emit('newComment', {
        //     newComment
        // }, comment.context)
    })

    socket.on('incrementLike', function(id, context){
        incrLike(id, context);
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('incrementLike', id, context)
    })

    socket.on('decrementLike', function(id, context){
        decrLike(id, context);
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('decrementLike', id, context)
    })


    socket.on('removeComment', function({id, context}){
        deleteComment(id, context);
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('deleteComment', id, context)
    })

    socket.on('dragged', function({id, text, user, like, draggedTo, draggedFrom}){
        const userD = getUser(socket.id); 

        if(userD){
            let sessionId = userD.sessionId;
            correctDataAfterDrag(id, text, user, like, sessionId, draggedTo, draggedFrom);
            
            socket.broadcast.to(userD.sessionId).emit('correctDataAfterDrag', {id, text, user, like, sessionId, draggedTo, draggedFrom})
            // io.to(userD.sessionId).emit('correctDataAfterDrag', {id, text, user, like, sessionId, draggedTo, draggedFrom})
        }
    })

    socket.on('editedComment', function({id, text, context}){
        editedComment(id, text, context);
        const user = getUser(socket.id); 

        if(user)
        socket.broadcast.to(user.sessionId).emit('editedComment', {id, text, context})
    })

    socket.on('socketSettingsChanged', function({maxLikes}){
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('socketSettingsChanged', {maxLikes})
    })

    socket.on('hideCards', function(){
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('hideCards')
    })

    socket.on('showCards', function(){
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('showCards')
    })
    
    socket.on('hideLikes', function(){
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('hideLikes')
    })

    socket.on('showLikes', function(){
        const user = getUser(socket.id); 

        if(user)
        io.to(user.sessionId).emit('showLikes')
    })

    socket.on('mergeComment', function({targetCardId, targetCardText, sourceCardId, text, targetCardUser, user, draggedTo, draggedFrom}){
        mergeComment(targetCardId, targetCardText, sourceCardId, text, targetCardUser, user, draggedTo, draggedFrom);
        const userD = getUser(socket.id); 

        if(userD)
        socket.broadcast.to(userD.sessionId).emit('mergeComment', {targetCardId, targetCardText, sourceCardId, text,targetCardUser, user, draggedTo, draggedFrom})
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

    socket.on('setFirstBoxTitle', function(title){
        const user = getUser(socket.id); 

        if(user)
        socket.broadcast.to(user.sessionId).emit('setFirstBoxTitle', title)
    })

    socket.on('setSecondBoxTitle', function(title){
        const user = getUser(socket.id); 

        if(user)
        socket.broadcast.to(user.sessionId).emit('setSecondBoxTitle', title)
    })


    socket.on('setThirdBoxTitle', function(title){
        const user = getUser(socket.id); 

        if(user)
        socket.broadcast.to(user.sessionId).emit('setThirdBoxTitle', title)
    })

    socket.on('syncTitles', function(firstBoxTitle, secondBoxTitle, thirdBoxTitle){
        const user = getUser(socket.id); 
        console.log('firstboxtitle '+firstBoxTitle)  
        if(user)
        socket.broadcast.to(user.sessionId).emit('syncTitles',{firstBoxTitle, secondBoxTitle, thirdBoxTitle})
    })

    socket.on("disconnect", function(){
        const user = removeUser(socket.id);
        if(user && user.username=='Admin'){
            console.log("Disconnect "+user.sessionId+" "+user.username+" "+new Date())
            socket.broadcast.to(user.sessionId).emit('hostDisconnected');
        }

        if(user){
            console.log("Disconnect "+user.sessionId+" "+user.username+" "+new Date())
            io.to(user.sessionId).emit('removeUser', {
             user: user.username
            })
        }
    })
})


server.listen(PORT, function(){
  return console.log('Running on port '+PORT);
})