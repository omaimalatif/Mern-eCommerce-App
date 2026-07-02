const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        let token;

        // 1. Extract token from Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Catch missing tokens or literal "null"/"undefined" strings from frontend localstorage issues
        if (!token || token === "null" || token === "undefined") {
            return res.status(401).json({
                message: "Not authorized, no token provided"
            });
        }

        // 2. Verify token integrity
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Normalize ID formats so both req.user.id and req.user._id exist
        req.user = {
            ...decoded,
            id: decoded.id || decoded._id,
            _id: decoded._id || decoded.id
        };

        next();

    } catch (error) {
        // Helpful server-side logging to tell you if it's expired or fake
        console.error("JWT Verification Middleware Error:", error.message);
        
        return res.status(401).json({
            message: "Not authorized, token failed"
        });
    }
};

module.exports = { protect };