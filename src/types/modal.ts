import { ReactNode } from 'react';

export type TModalProps = {
    children: ReactNode;
    onClose: () => void;
};