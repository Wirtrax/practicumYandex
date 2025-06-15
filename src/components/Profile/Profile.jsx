import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import SideBar from "./SideBar";
import styles from "./ProfileStyle.module.css";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser, getUser } from "../../services/actions/updateUser";

function Profile() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((state) => state.auth);
    const { user: regUser } = useSelector((state) => state.registration);
    const { user: refreshTokenUser } = useSelector((state) => state.refreshToken);
    const { user: updatedUser, updateUserRequest, updateUserFailed } = useSelector((state) => state.updateUser);

    const currentUser = authUser || regUser || refreshTokenUser || updatedUser || {};

    const [name, setName] = useState(currentUser.name || "");
    const [email, setEmail] = useState(currentUser.email || "");
    const [password, setPassword] = useState("");

    const [isNameDisabled, setIsNameDisabled] = useState(true);
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);

    useEffect(() => {
        setName(currentUser.name || "");
        setEmail(currentUser.email || "");
    }, [currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(email, name, password))
    };

    return (
        <section className={styles.container}>
            <SideBar info='В этом разделе вы можете изменить свои персональные данные'/>
            <form onSubmit={handleSubmit} className={styles.inputGroup}>
                <Input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon="EditIcon"
                    onIconClick={() => setIsNameDisabled(!isNameDisabled)}
                    disabled={isNameDisabled}
                    extraClass={styles.inputPhoneV}
                />
                <Input
                    type="email"
                    placeholder="Логин"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon="EditIcon"
                    onIconClick={() => setIsEmailDisabled(!isEmailDisabled)}
                    disabled={isEmailDisabled}
                    extraClass={styles.inputPhoneV}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon="EditIcon"
                    extraClass={styles.inputPhoneV}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={updateUserRequest}
                >
                    {updateUserRequest ? 'Сохранение...' : 'Сохранить'}
                </Button>
                {updateUserFailed && <p className="text text_type_main-default text_color_error">Ошибка при обновлении данных</p>}
            </form>
        </section>
    );
}

export default Profile