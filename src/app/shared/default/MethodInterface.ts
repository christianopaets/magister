import {Group} from '@models/Group';
import {IError} from '@models/Error';

export interface MethodInterface {
  error: IError;
  winStrategy: string;
  canBeCalled(groups: Group[]): boolean;
  run(groups: Group[]): any;
}
