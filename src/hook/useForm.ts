import { useState } from 'react';

export function useForm<T extends Record<string, any>>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return { values, handleChange, setValues };
}