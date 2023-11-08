import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { AuthDto } from "./dto/auth.dto";
import { BaseResponse } from "../../shared/utils/base.response";
import { JwtService } from "./jwt.service";
import { IAuth } from "./auth.interface";
import { RegisterDto } from "./dto/register.dto";
import { errorResponse } from "../../shared/utils/error.response";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    
    private logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        readonly jwtService: JwtService

    ) {}

    async login(dto: AuthDto): Promise<BaseResponse<IAuth>> {

        try {

            const data: UserEntity = await this.findUsername(dto.username)
            if(!data) {

                this.logger.warn(`Username not found: [${dto.username}]`);
                throw new HttpException("Not found username", HttpStatus.NOT_FOUND);
                
            }

            const isValid: boolean = this.jwtService.isPasswordValid(dto.password, data.password);

            if (!isValid) {

                this.logger.warn(`User password not valid. Password: [${dto.password}]`);
                throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);

            }

            const payload = {
                id: data.id,
                username: data.username
            };

            const { accessToken } = this.jwtService.generateJwt(payload)

            const result: IAuth = {
                ...payload,
                accessToken
            }

            return { statusCode: 200, data: result }
            
        }catch (e) {
            
            return errorResponse(e)
            
        }

    }

    async register(dto: RegisterDto): Promise<BaseResponse<IAuth>> {

        try {

            const { username, password, repeatPassword }: RegisterDto = dto

            const data: UserEntity = await this.findUsername(username)
            if(data) {

                this.logger.warn(`Username exist: [${dto.username}]`);
                throw new HttpException('Username already exists', HttpStatus.CONFLICT);

            }
            if(password != repeatPassword) {

                this.logger.warn(`Password not equal. password: [${password}]`);
                throw new HttpException("Password not equal. password", HttpStatus.UNAUTHORIZED);

            }

            const createData: UserEntity = await this.createNewUser(dto)

            const payload = {
                id: createData.id,
                username: createData.username
            };

            const { accessToken } = this.jwtService.generateJwt(payload)

            const result: IAuth = {
                ...payload,
                accessToken
            }

            return { statusCode: 200, data: result }

        }catch (e) {

            return errorResponse(e)
            
        }
    
    }

    // *** REPOSITORY *** //

    async findUsername(username: string): Promise<UserEntity> {

        return await UserEntity.findOne({
            where: {
                username
            }
        })

    }

    async createNewUser(dto: AuthDto): Promise<UserEntity> {

        const { username, password }: AuthDto = dto

        const user: UserEntity = this.userRepository.create({
            username, password: this.jwtService.encodePassword(password)
        })
        await this.userRepository.save(user);

        return user

    }

}
