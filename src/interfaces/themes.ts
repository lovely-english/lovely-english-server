import { Content } from './content';

export interface Themes {
  title: string;
  description: string;
  content: Content[];
  enableUsers: string; //TO DO: the user mode should be made//
  isActive: boolean;
}
