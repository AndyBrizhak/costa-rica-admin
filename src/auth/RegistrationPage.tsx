import { useNotify, useSafeSetState, Form, TextInput, PasswordInput, Button } from "react-admin";
import { Box, Card, CardActions, Typography } from "@mui/material";
import { httpClient } from "./httpClient";

// 1. Описываем структуру данных формы
interface RegisterValues {
  email?: string;
  password?: string;
}

// 2. Описываем структуру ошибки, которую может вернуть наш httpClient (fetchUtils)
interface HttpError {
  status: number;
  message: string;
  body?: {
    message?: string;
    errors?: string[];
  };
}

const RegistrationPage = () => {
  const [loading, setLoading] = useSafeSetState<boolean>(false);
  const notify = useNotify();
  const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || "cr_admin_token";

  const handleSubmit = async (values: RegisterValues) => {
    if (!values.email || !values.password) return;

    setLoading(true);
    try {
      const { json } = await httpClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          userName: values.email, // Используем email как username по умолчанию
        }),
      });

      localStorage.setItem(tokenKey, json.token);
      localStorage.setItem(`${tokenKey}_roles`, JSON.stringify(json.roles || []));

      notify("Registration successful!", { type: "success" });
      window.location.href = "/";
    } catch (error: unknown) {
      setLoading(false);

      // Приводим ошибку к нашему интерфейсу
      const err = error as HttpError;

      // Пытаемся достать внятное описание ошибки из ответа Identity
      const errorMessage = err.body?.message || err.message || "Registration failed";

      notify(errorMessage, { type: "warning" });
      console.error("Registration technical details:", err.body);
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
      <Card sx={{ minWidth: 350, padding: "2em", borderRadius: "12px", boxShadow: 3 }}>
        <Box sx={{ textAlign: "center", marginBottom: "1.5em" }}>
          <Typography variant="h5" fontWeight="bold">
            Admin Panel
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Create a new account
          </Typography>
        </Box>

        <Form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextInput source="email" label="Email" type="email" fullWidth required />
            <PasswordInput source="password" label="Password" fullWidth required />
          </Box>
          <CardActions sx={{ padding: "1.5em 0 0 0" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              label={loading ? "Registering..." : "Register"}
              sx={{ width: "100%", py: 1 }}
            />
          </CardActions>
        </Form>

        <Box sx={{ textAlign: "center", marginTop: "1.5em" }}>
          <Typography variant="body2">
            <a href="#/login" style={{ textDecoration: "none", color: "#3b82f6", fontWeight: 500 }}>
              Already have an account? Login
            </a>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default RegistrationPage;
