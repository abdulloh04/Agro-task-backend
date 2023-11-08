import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly taskRepository: Repository<UserEntity>
    ) {}

    create(createUserInput: CreateUserInput) {

        return 'This action adds a new user';
    
    }

    findAll() {

        return `This action returns all user`;
    
    }

    findOne(id: number) {

        return `This action returns a #${id} user`;
    
    }

    update(id: number, updateUserInput: UpdateUserInput) {

        return `This action updates a #${id} user`;
    
    }

    remove(id: number) {

        return `This action removes a #${id} user`;
    
    }

}
