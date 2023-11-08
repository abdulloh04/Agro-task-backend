import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserEntity)
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserEntity)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {

        return this.userService.create(createUserInput);
    
    }

    @Query(() => [UserEntity], { name: 'user' })
    findAll() {

        return this.userService.findAll();
    
    }

    @Query(() => UserEntity, { name: 'user' })
    findOne(@Args('id', { type: () => Int }) id: number) {

        return this.userService.findOne(id);
    
    }

    @Mutation(() => UserEntity)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {

        return this.userService.update(updateUserInput.id, updateUserInput);
    
    }

    @Mutation(() => UserEntity)
    removeUser(@Args('id', { type: () => Int }) id: number) {

        return this.userService.remove(id);
    
    }

}
