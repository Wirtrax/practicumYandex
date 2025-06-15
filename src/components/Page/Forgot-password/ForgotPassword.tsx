import React from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../utils/container";
import FormGroup from "../utils/FormGroup";
import GroupSubButtom from "../utils/GroupSubButtom";
import { forgotPasswordRequest } from "../../../services/actions/passwordResetActions";
import { useAppDispatch } from '../../../types/hooks';
import { useForm } from "../../../hook/useForm";
import style from '../Login/loginStyle.module.css'


const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.email) return;
    await dispatch(forgotPasswordRequest(values.email));
    navigate("/reset-password", {
      state: {
        fromForgotPassword: true
      }
    });
  }

  return (
    <Container title={"Восстановление пароля"}>
      <FormGroup buttonName={"Восстановить"} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          extraClass={style.inputPhoneV}
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