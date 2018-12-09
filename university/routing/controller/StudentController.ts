import {Get, JsonController, Patch, Post as HttpPost} from 'routing-controllers';
import {getConnectionManager, Repository} from 'typeorm';
import {Student} from '../entity/Student';
import {EntityFromParam} from '../../src/decorators/EntityFromParam';
import {EntityFromBody} from '../../src/decorators/EntityFromBody';
import {EntityFromBodyParam} from '../../src/decorators/EntityFromBodyParam';

@JsonController()
export class StudentController {

    private postRepository: Repository<Student>;

    constructor() {
        this.postRepository = getConnectionManager().get().getRepository(Student);
    }

    @Get('/student/:id')
    getOne(@EntityFromParam('id') post: Student): Student {
        return post;
    }

    @Get('/students')
    getAll(): Promise<Student[]> {
      return this.postRepository.find();
    }

    @HttpPost('/posts')
    save(@EntityFromBody() post: Student) {
        return this.postRepository.save(post);
    }

    @Patch('/posts')
    patch(@EntityFromBodyParam('post1') post1: Student, @EntityFromBodyParam('post2') post2: Student) {
        return this.postRepository.save([post1, post2]);
    }

}
