import {Group} from '@models/Group';

export interface MethodInterface {
  error: {code: number, message: string};
  canBeCalled(groups: Group[]): boolean;
  run(groups: Group[]): any;
}
