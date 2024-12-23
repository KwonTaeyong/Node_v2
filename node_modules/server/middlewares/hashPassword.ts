import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const hashPassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    bcrypt.hash(password, 10, (err: Error | undefined, hashedPassword: string) => {
        if(err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Internal Server Error');
        }
        req.body.password = hashedPassword;
        next();
    })
}

export default hashPassword;
