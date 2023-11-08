import { CorsOptions } from "cors";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppCorsOptions implements CorsOptions {

    private readonly allowedOrigins = ['http://localhost:3600'];

    origin(req, callback) {

        if (this.allowedOrigins.includes(req.headers['origin'])) {

            callback(null, true);
        
        } else {

            callback(new Error('Origin not allowed'));
        
        }
    
    }

}