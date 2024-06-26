const JWT=require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        console.log(req.get("authorization"));
        let token = req.get("authorization").split(" ")[1];
        let decodedToken = JWT.verify(token, process.env.SECRET_KEY);
        req.token = decodedToken;
        next();
    } catch (error) {
        error.message = "Not authenticated";
        error.statusCode = 401;
        next(error);
    }
};


// authentication middleware
module.exports.isAdmin = (req, res, next) => {
    console.log(req.token.role);
    if (req.token.role !="admin") {
        let error = new Error("Not authorized as admin");
        error.statusCode = 403;
        next(error);
    } else {
        next();
    }
};

module.exports.isTeacher = (req, res, next) => {
    if (req.token.role != "teacher") {
        let error = new Error("not authorized as teacher");
        error.statusCode = 403;
        next(error);
    } else {
        next();
    }
};

module.exports.isAdminOrTeacher=(req,res,next)=>{
    if(req.token.role != "teacher" && req.token.role != "admin"){
        let error=new Error("not authorized");
        error.statusCode = 403;
        next(error);
    }else{
        next();
    }
}