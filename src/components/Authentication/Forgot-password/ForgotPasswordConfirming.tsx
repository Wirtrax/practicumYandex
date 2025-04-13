import React, { useState, ChangeEvent } from "react";

import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";
import { resetPasswordRequest } from "../../../services/actions/passwordResetActions";
import { useAppDispatch } from '../../../types/hooks';

const ForgotPasswordConfirming: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !token) return;
        await dispatch(resetPasswordRequest(password, token));
        navigate("/login", { replace: true });
    };

    return (
        <Container title={"Восстановление пароля"}>
            <FormGroup buttonName={"Сохранить"} onSubmit={handleSubmit}>
                <PasswordInput
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Введите новый пароль"
                />
                <Input
                    type="text"
                    placeholder="Введите код из письма"
                    value={token}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
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