export type AuthFormProps = {
    onSubmit: (e: React.FormEvent) => void;
    buttonName: string;
    children: React.ReactNode;
};

export type ContainerProps = {
    title: string;
    children: React.ReactNode;
};

export type GroupSubButtonProps = {
    children: React.ReactNode;
};

export type LoginProps = {};
export type RegisterProps = {};
export type ForgotPasswordProps = {};
export type ForgotPasswordConfirmingProps = {};