import React, { useState, ChangeEvent } from "react";

import { register } from "../../../services/actions/registrationAction";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";
import { useAppDispatch } from '../../../types/hooks';

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) return;
        if (password.length < 6) return;
        dispatch(register(email, password, name, navigate));
    };

    return (
        <Container title={"Регистрация"}>
            <FormGroup buttonName={"Зарегистрироваться"} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <PasswordInput
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    name="password"
                />
            </FormGroup>
            <GroupSubButtom>
                <div>
                    <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</span>
                    <Button htmlType="button" type="secondary" size="large">
                        <Link to="/login">Войти</Link>
                    </Button>
                </div>
            </GroupSubButtom>
        </Container>
    );
}

export default Register;