import React, { useState, ChangeEvent } from "react";

import { login } from "../../../services/actions/authAction";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";
import { useAppDispatch } from '../../../types/hooks';

import { useForm } from "../../../hook/useForm";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { values, handleChange } = useForm({
        email: "",
        password: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!values.email || !values.password) return;
        dispatch(login(values.email, values.password, navigate));
    };

    return (
        <Container title={"Вход"}>
            <FormGroup buttonName={"Войти"} onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="E-mail"
                    name='email'
                    value={values.email}
                    onChange={(handleChange)}
                    error={false}
                    errorText="Ошибка"
                />
                <PasswordInput
                    value={values.password}
                    onChange={(handleChange)}
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