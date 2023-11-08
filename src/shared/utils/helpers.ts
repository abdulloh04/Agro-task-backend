const crypto = require('crypto');

export interface Pagination {

    limit: number;
    offset: number;
}

export enum Types {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean'
}

export const startOfDate = (date: string) => {

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    return startOfDay

}

export const endOfDate = (date: string) => {

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    return endOfDay

}

export function handlePagination(page: number, perPage: number): Pagination {

    const limit = perPage;
    const offset = limit * (page - 1 || 0);

    return {
        limit: limit,
        offset: offset
    };

}

export function generateHash(domain: string, ip: string, userAgent: string): string {

    const data: string = domain + ip + userAgent;
    const hash = crypto.createHash('sha256');
    hash.update("salt-10");
    hash.update(data);
    const hexDigest = hash.digest('hex');
    return hexDigest;

}

const today = new Date();
export const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
export const todayEnd = new Date(todayStart.getFullYear(), todayStart.getMonth(), todayStart.getDate(), 23, 59, 59);

export function createBetweenDateRange(year: number, month: number) {

    const startDate = new Date(year, month - 1, 1); // Months are zero-indexed in JavaScript
    const endDate = new Date(year, month, 0); // Get the last day of the month

    return {
        startDate,
        endDate
    };

}

export function removeNullObject(obj: any) {

    const filteredObj = {};

    for (const key of Object.keys(obj)) {

        if (obj[key] !== null) {

            filteredObj[key] = obj[key];
        
        }
    
    }
    
    return filteredObj

}
