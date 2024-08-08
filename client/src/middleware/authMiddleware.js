import jwt from 'jsonwebtoken';

const SECRET_KEY = '838HHJSK_*&2sol2)ks';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized! Token has expired.' });
        }
        req.userId = decoded.id;
        next();
    });
};

export default verifyToken;