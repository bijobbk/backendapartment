// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
 
// async function adminAuthenticateMiddleware(req: Request, res: Response, next: NextFunction) {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ message: 'Authorization token is missing' });
//     }
 
//     try {
//         const decoded = jwt.verify(token, '#thdgdf9') as jwt.JwtPayload;
 
//         // Now TypeScript knows that 'decoded' is of type JwtPayload
//         if (typeof decoded === 'string') {
//             return res.status(401).json({ message: 'Invalid token format' });
//         }
 
//         // You can access 'username' safely
//         const username = decoded.username;
        
 
//         // You can check if the user is valid based on your requirements here.
//         // For example, you can query the database to see if the user exists.
 
//         // If valid, you can return a success response and call next
//         res.status(200).json({ message: 'Authentication successful', user: username });
//         next(); // Call next here to pass control to the next middleware
//     } catch (error) {
//         res.status(401).json({ message: 'Authentication failed' });
//     }
// }
 
// export default adminAuthenticateMiddleware;
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
 
async function adminAuthenticateMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
 
    try {
        const decoded = jwt.verify(token, '#thdgdf9') as jwt.JwtPayload;
 
        // Now TypeScript knows that 'decoded' is of type JwtPayload
        if (typeof decoded === 'string') {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        next(); // Call next here to pass control to the next middleware
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
}
 
export default adminAuthenticateMiddleware;
 
