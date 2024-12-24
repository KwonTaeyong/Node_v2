
import { SessionData } from "express-session"; 
import "express-session";

declare module "express-session" {
    interface SessionData {
        user?: {     
            id: string;
        };
    }
}

