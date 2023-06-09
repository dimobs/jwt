const { veryfySession } = require("../services/users");

module.exports = () => ((req, res) => {
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const userData = veryfySession(token);
            req.user = userData;
        }
        next();
    } catch (err) {
        req.headers = []
        res.status(489).json({ message: 'Invalid token. Pleace sing in!' })
    }
});