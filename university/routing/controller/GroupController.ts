import {Get, JsonController} from 'routing-controllers';
import {Group} from '../entity/Group';
import {getConnectionManager, Repository} from 'typeorm';

@JsonController()
export class GroupController {

  private postRepository: Repository<Group>;

  constructor() {
    this.postRepository = getConnectionManager().get().getRepository(Group);
  }

  @Get('/groups')
  get(): Promise<Group[]> {
    return this.postRepository.find();
  }
}
