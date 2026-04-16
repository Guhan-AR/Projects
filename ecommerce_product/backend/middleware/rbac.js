const rbac = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.userRole || !allowedRoles.includes(req.userRole)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient privileges for this role' });
        }
        next();
    };
};

module.exports = rbac;
