export default function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User is not authenticated' });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
}
