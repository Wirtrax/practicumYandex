import React, { useState, ChangeEvent } from "react";

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";

import { forgotPasswordRequest } from "../../../services/actions/passwordResetActions";
import { useAppDispatch } from '../../../types/hooks';

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await dispatch(forgotPasswordRequest(email));
    navigate("/reset-password", { state: { fromForgotPassword: true } });
  }

  return (
    <Container title={"Восстановление пароля"}>
      <FormGroup buttonName={"Восстановить"} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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

export default ForgotPassword;