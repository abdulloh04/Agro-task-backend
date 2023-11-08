import { BaseResponse } from "../../../shared/utils/base.response";

export abstract class IUserRepository<T> {

    abstract getAll(): Promise<BaseResponse<T[]>>;

    abstract get(id: string): Promise<BaseResponse<T>>;

    abstract create(item: T): Promise<BaseResponse<T>>;

    abstract update(id: string, userId: number, item: T);

    abstract delete(id: number, userId: number);

    abstract login(): Promise<BaseResponse<T>>

    abstract register(): Promise<BaseResponse<T>>

}