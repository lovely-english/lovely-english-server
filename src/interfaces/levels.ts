import { Themes } from './themes';

export interface Levels {
  title: string;
  description: string;
  themes: Themes[];
  enableUsers: string; //TO DO: the user mode should be made//
  isActive: boolean;
}
