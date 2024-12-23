
import { SessionData } from "express-session"; 
import "express-session";

declare module "express-session" {
    interface SessionData {
        user?: {     // user는 선택적 속성으로 설정
            id: string;
        };
    }
}

