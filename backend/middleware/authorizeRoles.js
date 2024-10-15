// backend/middleware/authorizeRoles.js
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
}

module.exports = authorizeRoles;
