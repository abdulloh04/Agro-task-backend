import { Logger } from '@nestjs/common';

export class ServiceExceptions {

    static handle(e: any, serviceName: string, methodName: string) {

        const logger = new Logger('ServiceExceptions');
        logger.error(
            `Service: [${serviceName}], method: [${methodName}], Error: ${e}`
        );
        throw e;
    
    }

}
