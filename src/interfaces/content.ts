import { Files } from './files';

export interface Content {
  title: string;
  description: string;
  enableUsers: string; //TO DO: the user mode should be made//
  skills: string; //TO DO: the skills models should be made//
  deadline: Date;
  files: Files[];
  isActivity: boolean;
  isActive: boolean;
}
