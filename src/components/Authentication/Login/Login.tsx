import React, { useState, ChangeEvent } from "react";

import { login } from "../../../services/actions/authAction";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";
import { useAppDispatch } from '../../../types/hooks';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        dispatch(login(email, password, navigate));
    };

    return (
        <Container title={"Вход"}>
            <FormGroup buttonName={"Войти"} onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    error={false}
                    errorText="Ошибка"
                />
                <PasswordInput
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    name="password"
                />
            </FormGroup>
            <GroupSubButtom>
                <div>
                    <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</span>
                    <Button htmlType="button" type="secondary" size="large">
                        <Link to="/register">Зарегистрироваться</Link>
                    </Button>
                </div>
                <div>
                    <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
                    <Button htmlType="button" type="secondary" size="large">
                        <Link to="/forgot-password">Восстановить пароль</Link>
                    </Button>
                </div>
            </GroupSubButtom>
        </Container>
    );
}

export default Login;