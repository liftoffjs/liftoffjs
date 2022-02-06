import { createContext } from 'react';
import { User } from '../../user';

export interface AppContextProps {
  user?: User;
}

export const AppContext = createContext<AppContextProps | undefined>({});
