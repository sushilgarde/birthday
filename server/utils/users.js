var users = []
var comments = []
var toImproves = []
var actionItems = []
const axios = require('axios')
const addUser = ({id, username, sessionId})=>{
    // //store user
    // const user = {id, username, sessionId}
    // users.push(user)

    const user = {
        name: username,
        sessionId: sessionId
    }

    // axios.post('localhost:3000/users', user)
    // .then((res)=>{
    //     console.log(res)
    // })
    // .catch((e)=>{
    //     console.log(e)
    // })

    axios.get('localhost:3000/users')
    .then((res)=>{
        console.log('Sucessful');
        console.log(res)
    })
    .catch((e)=>{
        console.log('Errored');
        console.log(e)
    })

    return {
        user
    }
}

const addComment = ({id, text, user, like, sessionId, context})=>{
    const comment = {id, text, user, like, sessionId}
    
    switch(context){
        case 'wentWell':
            comments.push({
                id,
                sessionId,
                text,
                user,
                like
            })
        break;

        case 'toImprove':
            toImproves.push({
                id,
                sessionId,
                text,
                user,
                like
            })
        break;
        case 'actionItem':
            actionItems.push({
                id,
                sessionId,
                text,
                user,
                like
            })
        break;

    }
    
    return {
        comment
    }
}


const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id
    })

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

//Deleting comment
function removeElement(array, id){
    const index = array.findIndex((x)=>{
        return x.id === id
    })

    if(index !== -1){
        return array.splice(index, 1)[0]
    }
}
const deleteComment = function deleteComment(id, context){
  switch(context){
    case 'wentWell':
        removeElement(comments, id)
        break;
    
    case 'toImprove':
        removeElement(toImproves, id)
        break;
    
    case 'actionItem':
        removeElement(actionItems, id)
        break;
  }
}


const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUserInRoom = (sessionId) => {
    return users.filter((user) => user.sessionId === sessionId)
}

const getComments = (id) =>{
    return comments.filter((x) => x.sessionId == id)
}
const getToImproves = (id) =>{
    return toImproves.filter((x) => x.sessionId == id)
}
const getActionItems = (id) =>{
    return actionItems.filter((x) => x.sessionId == id)
}

const getAllUsers = ()=>{
   return users;
}

const editedComment = (id, text, context) =>{
    let array = null;
    switch(context){
        case 'wentWell':
            array = comments;
            break;
        
        case 'toImprove':
            array = toImproves;
            break;
        
        case 'actionItem':
            array = actionItems;
            break;
    }

    array.forEach(ele => {
        if(ele.id === id){
            ele.text = text;
        }
    });
}

const mergeComment = (targetCardId, targetCardText, sourceCardId, text, targetCardUser, user, draggedTo, draggedFrom)=>{
    switch(draggedFrom){
        case 'wentWell':
            removeElement(comments, sourceCardId)
            break;
    
        case 'toImprove':
            removeElement(toImproves, sourceCardId)
            break;
        
        case 'actionItem':
            removeElement(actionItems, sourceCardId)
            break;
    }

    switch(draggedTo){
        case 'wentWell':
            comments.forEach(ele => {
                if(ele.id === targetCardId){
                    ele.text = targetCardText + ' \n --- \n ' + text;

                    if(targetCardUser != user)
                    ele.user = targetCardUser + ' + ' + user;
                }
            });
        break;

        case 'toImprove':
            toImproves.forEach(ele => {
                if(ele.id === targetCardId){
                    ele.text = targetCardText + ' \n --- \n ' + text;

                    if(targetCardUser != user)
                    ele.user = targetCardUser + ' + ' + user;
                }
            });
        break;
        case 'actionItem':
            actionItems.forEach(ele => {
                if(ele.id === targetCardId){
                    ele.text = targetCardText + ' \n --- \n ' + text;

                    if(targetCardUser != user)
                    ele.user = targetCardUser + ' + ' + user;
                }
            });
        break;
    
    }
    
}

const correctDataAfterDrag = (id, text, user, like, sessionId, draggedTo, draggedFrom) => {
        switch(draggedFrom){
            case 'wentWell':
                removeElement(comments, id)
                break;
        
            case 'toImprove':
                removeElement(toImproves, id)
                break;
            
            case 'actionItem':
                removeElement(actionItems, id)
                break;
        }
    
        switch(draggedTo){
            case 'wentWell':
                comments.push({
                    id,
                    sessionId,
                    text,
                    user,
                    like
                })
            break;
    
            case 'toImprove':
                toImproves.push({
                    id,
                    sessionId,
                    text,
                    user,
                    like
                })
            break;
            case 'actionItem':
                actionItems.push({
                    id,
                    sessionId,
                    text,
                    user,
                    like
                })
            break;
        
    }
}

const flushData = () => {
    comments = []
    toImproves = []
    actionItems = []
}

const incrLike = (id, context) =>{
    switch(context){
        case 'wentWell':
            comments.findIndex((x)=>{
                if(x.id === id){
                    x.like++;
                }
            })
        break;

        case 'toImprove':
            toImproves.findIndex((x)=>{
                if(x.id === id){
                    x.like++;
                }
            })
        break;
        case 'actionItem':
            actionItems.findIndex((x)=>{
                if(x.id === id){
                    x.like++;
                }
            })
        break;

    }
}

const decrLike = (id, context) =>{
    switch(context){
        case 'wentWell':
            comments.findIndex((x)=>{
                if(x.id === id){
                    x.like--;
                }
            })
        break;

        case 'toImprove':
            toImproves.findIndex((x)=>{
                if(x.id === id){
                    x.like--;
                }
            })
        break;
        case 'actionItem':
            actionItems.findIndex((x)=>{
                if(x.id === id){
                    x.like--;
                }
            })
        break;

    }
}

module.exports ={
    addUser,
    removeUser,
    getUser,
    getUserInRoom,
    addComment,
    getComments,
    getToImproves,
    getActionItems,
    incrLike,
    decrLike,
    deleteComment,
    correctDataAfterDrag,
    editedComment,
    mergeComment,
    flushData,
    getAllUsers
}