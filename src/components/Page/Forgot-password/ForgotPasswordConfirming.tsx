import React, { useState, ChangeEvent, useEffect } from "react";

import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";
import { resetPasswordRequest } from "../../../services/actions/passwordResetActions";
import { useAppDispatch } from '../../../types/hooks';
import { useForm } from "../../../hook/useForm";

const ForgotPasswordConfirming: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { values, handleChange } = useForm({
        password: "",
        token: ""
    });

    useEffect(() => {
        if (location.state?.fromForgotPassword !== true) {
            navigate('/forgot-password', { replace: true });
        }
    }, [location.state, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!values.password || !values.token) return;
        await dispatch(resetPasswordRequest(values.password, values.token));
        navigate("/login", { replace: true });
    };

    return (
        <Container title={"Восстановление пароля"}>
            <FormGroup buttonName={"Сохранить"} onSubmit={handleSubmit}>
                <PasswordInput
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Введите новый пароль"
                    name="password"
                />
                <Input
                    type="text"
                    placeholder="Введите код из письма"
                    value={values.token}
                    onChange={handleChange}
                    name="token"
                />
            </FormGroup>
            <GroupSubButtom>
                <div>
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
                    <Button htmlType="button" type="secondary" size="large">
                        <Link to="/login">Войти</Link>
                    </Button>
                </div>
            </GroupSubButtom>
        </Container>
    );
}

export default ForgotPasswordConfirming;