const express = require('express');

const User = require('../models/user');
const Session = require('../models/session');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/sessions', (req, res)=>{
    const session = new Session(req.body)

    session.save().then(()=>{
        res.send(session);
    })
    .catch((e)=>{
        res.status(400).send(e);
    })
})

router.get('/sessions', (req, res)=>{
    Session.find({}).then((sessions)=>{
        res.status(200).send(sessions)
    })
    .catch((e)=>{
        res.status(500).send();
    })
})

router.get('/sessions/:id', (req, res)=>{
    Session.find({sessionId: req.params.id}).then((session)=>{
        res.status(200).send(session)
    })
    .catch((e)=>{
        res.status(500).send();
    })
})

router.patch('/session/:id', async (req, res)=>{
    try{
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true});

        if(!session){
            return res.status(404).send();
        }
        res.status(200).send(session)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.patch('/sessionuser/:id', async (req, res)=>{
    try{
        const session = await Session.findByIdAndUpdate(req.params.id, null , {new:true, runValidators: true});

        if(!session){
            return res.status(404).send();
        }
        session.user.push(req.body.user);
        session.save().then(()=>{
            res.status(200).send(session)
        })
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/users', (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user);
    })
    .catch((e)=>{
        res.status(400).send(e);
    })
})

router.post('/newComment', (req,res)=>{
    const comment = new Comment(req.body)

    comment.save().then(()=>{
        res.send(comment)
    })
    .catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/users', (req, res)=>{
    User.find({}).then((users)=>{
        res.status(200).send(users)
    })
    .catch((e)=>{
        res.status(500).send();
    })
})

router.get('/user/:id', (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        res.status(200).send(user)
    })
    .catch((e)=>{
        res.status(500).send();
    })
})

router.get('/usersinsession/:id', (req, res)=>{
    const _id = req.params.id;
    User.find({sessionId: _id}).then((users)=>{
        res.status(200).send(users)
    })
    .catch((e)=>{
        res.status(500).send();
    })
})

router.patch('/userbysocketId/:id', async (req, res)=>{
    try{
        const user = await User.findOneAndUpdate({socketId:req.params.id}, req.body, {new:true, runValidators: true});

        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.patch('/user/:id', async (req, res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true});

        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.get('/comments', async (req, res)=>{
    try{
        const comments = await Comment.find({})
    
        res.send(comments)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/commentsinsession/:id', async (req, res)=>{
    try{
        const comments = await Comment.find({sessionId: req.params.id})
    
        res.send(comments)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/updateComment/:id', async (req, res)=>{
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true});

        if(!comment){
            return res.status(404).send();
        }
        res.status(200).send(comment)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.patch('/updateLike/:id', async (req, res)=>{
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id, { $inc: { like: req.body.like }}, {new:true, runValidators: true});

        if(!comment){
            return res.status(404).send();
        }
        res.status(200).send(comment)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.delete('/deleteComment/:id', async (req, res)=>{
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if(!comment){
            res.status(404).send()
        }
        res.send(comment)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.get('/user/:id', (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        res.status(200).send(user)
    })
    .catch((e)=>{
        res.status(500).send();
    })
})

router.get('/userbyname/:sessionId/:name', (req, res)=>{
    User.find({sessionId: req.params.sessionId, name:req.params.name}).then((user)=>{
        res.status(200).send(user)
    })
    .catch((e)=>{
        res.status(500).send();
    })
})
module.exports = router