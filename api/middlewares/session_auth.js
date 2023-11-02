
const verifySession = (req,res, next)=>{
    console.log(req.session)
    if (req.session.user_id){
        next()
    }
    else{
        res.send(401)
    }
}

module.exports.verifySession = verifySession;