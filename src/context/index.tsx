import { createContext } from 'react';

type ModalContextType = ((key: number) => void) | null;

export const ModalContext = createContext<ModalContextType>(null);
