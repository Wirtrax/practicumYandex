import React, { useState, ChangeEvent } from "react";

import { register } from "../../../services/actions/registrationAction";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";
import { useAppDispatch } from '../../../types/hooks';

import { useForm } from "../../../hook/useForm";


const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { values, handleChange } = useForm({
        name: "",
        email: "",
        password: ""
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!values.name || !values.email || !values.password) return;
        if (values.password.length < 6) return;
        dispatch(register(values.email, values.password, values.name, navigate));
    };

    return (
        <Container title={"Регистрация"}>
            <FormGroup buttonName={"Зарегистрироваться"} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Имя"
                    value={values.name}
                    onChange={(handleChange)}
                    name="name"
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={(handleChange)}
                    name="email"
                />
                <PasswordInput
                    value={values.password}
                    onChange={(handleChange)}
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