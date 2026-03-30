import { useNotify, useSafeSetState, Form, TextInput, PasswordInput, Button } from "react-admin";
import { Box, Card, CardActions, Typography } from "@mui/material";
import { httpClient } from "./httpClient";

// 1. Описываем форму. Теперь никаких "any".
interface RegisterValues {
  email?: string;
  password?: string;
}

const RegistrationPage = () => {
  // 2. Используем внутренний хук react-admin вместо useState из react
  const [loading, setLoading] = useSafeSetState<boolean>(false);
  const notify = useNotify();
  const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || "cr_admin_token";

  const handleSubmit = async (values: RegisterValues) => {
    if (!values.email || !values.password) return;

    setLoading(true);
    try {
      const response = await httpClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          userName: values.email, // Используем почту как логин
        }),
      });

      localStorage.setItem(tokenKey, response.token);
      localStorage.setItem(`${tokenKey}_roles`, JSON.stringify(response.roles || []));

      notify("Регистрация успешна!", { type: "success" });

      // Переход в корень приложения
      window.location.href = "/";
    } catch (error: unknown) {
      setLoading(false);
      // 3. Безопасное извлечение сообщения об ошибке
      const message = error instanceof Error ? error.message : "Ошибка при регистрации";
      notify(message, { type: "warning" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(45deg, #1e293b 30%, #0f172a 90%)",
      }}
    >
      <Card sx={{ minWidth: 350, padding: "1.5em", borderRadius: "12px" }}>
        <Box sx={{ textAlign: "center", marginBottom: "1.5em" }}>
          <Typography variant="h5" fontWeight="bold">
            Costa Rica Guider
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Создание аккаунта (Email = Логин)
          </Typography>
        </Box>

        <Form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextInput source="email" label="Email" type="email" fullWidth required />
            <PasswordInput source="password" label="Пароль" fullWidth required />
          </Box>
          <CardActions sx={{ padding: "1em 0" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
              label={loading ? "Загрузка..." : "Зарегистрироваться"}
            />
          </CardActions>
        </Form>

        <Box sx={{ textAlign: "center", marginTop: "1em" }}>
          <Typography variant="body2">
            <a href="#/login" style={{ textDecoration: "none", color: "#3b82f6", fontWeight: 500 }}>
              Назад ко входу
            </a>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default RegistrationPage;
