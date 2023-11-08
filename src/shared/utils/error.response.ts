import { BaseResponse } from "./base.response";

export const errorResponse = (e: any): BaseResponse<null> => {

    return { statusCode: e.status, data: null, message: e.message }

}