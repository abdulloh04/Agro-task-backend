import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer
} from "@nestjs/websockets";
import { DashboardService } from './dashboard.service';
import { Server } from "socket.io";
import * as process from "process";

@WebSocketGateway({
    cors: {
        origin: process.env.SOCKET,
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
})
export class DashboardGateway {

    @WebSocketServer() server: Server;

    constructor(private readonly dashboardService: DashboardService) {}

    @SubscribeMessage('dashboard-card:message')
    async card(@MessageBody("id") id: number) {

        setInterval(async () => {

            const data = await this.dashboardService.card(id);

            this.server.emit('dashboard-card:emit', data);
        
        }, 2000)
    
    }

    @SubscribeMessage('dashboard:message')
    async dashboard(@MessageBody("id") id: number) {

        setInterval(async () => {

            const data = await this.dashboardService.dashboard(id);

            this.server.emit('dashboard:emit', data);

        }, 2000)

    }

}
