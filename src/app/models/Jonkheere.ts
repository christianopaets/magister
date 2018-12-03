import {Student} from '@models/Student';
import {Group} from '@models/Group';

export interface Jonckheere extends Group {
  students: JonckheereItem[];
  advantageTotal?: number;
}

export interface JonckheereItem extends Student {
  advantage?: number;
}
