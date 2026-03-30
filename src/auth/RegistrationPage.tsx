import { useNotify, useSafeSetState, Form, TextInput, PasswordInput, Button } from "react-admin";
import { Box, Card, CardActions, Typography } from "@mui/material";
import { httpClient } from "./httpClient";

// Интерфейс для типизации значений формы
interface RegisterValues {
  email?: string;
  password?: string;
}

const RegistrationPage = () => {
  // Используем безопасное состояние из react-admin для предотвращения утечек памяти
  const [loading, setLoading] = useSafeSetState<boolean>(false);
  const notify = useNotify();
  const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || "cr_admin_token";

  const handleSubmit = async (values: RegisterValues) => {
    if (!values.email || !values.password) return;

    setLoading(true);
    try {
      // httpClient теперь возвращает объект { status, headers, body, json }
      const { json } = await httpClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          userName: values.email,
        }),
      });

      // Сохраняем полученные данные (token и roles) из вложенного объекта json
      localStorage.setItem(tokenKey, json.token);
      localStorage.setItem(`${tokenKey}_roles`, JSON.stringify(json.roles || []));

      notify("Registration successful!", { type: "success" });

      // Принудительный редирект на главную (авторизованную) зону
      window.location.href = "/";
    } catch (error: unknown) {
      setLoading(false);
      // Пытаемся извлечь сообщение об ошибке
      const message = error instanceof Error ? error.message : "Registration failed";
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
            Admin Panel
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Create an account (Email will be your login)
          </Typography>
        </Box>

        <Form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextInput source="email" label="Email" type="email" fullWidth required />
            <PasswordInput source="password" label="Password" fullWidth required />
          </Box>
          <CardActions sx={{ padding: "1em 0" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
              label={loading ? "Loading..." : "Register"}
            />
          </CardActions>
        </Form>

        <Box sx={{ textAlign: "center", marginTop: "1em" }}>
          <Typography variant="body2">
            <a href="#/login" style={{ textDecoration: "none", color: "#3b82f6", fontWeight: 500 }}>
              Back to Login
            </a>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default RegistrationPage;
