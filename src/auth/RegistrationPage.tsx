import {
  useNotify,
  useSafeSetState,
  Form,
  TextInput,
  PasswordInput,
  Button,
  required,
  email,
  minLength,
  regex,
} from "react-admin";
import { Box, Card, CardActions, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { httpClient } from "./httpClient";

interface RegisterValues {
  email?: string;
  password?: string;
}

// Обновленный интерфейс ошибки под твой бэкенд
interface HttpError {
  status: number;
  body?: {
    errors?: string[]; // Бэкенд возвращает массив строк здесь
  };
  message: string;
}

const validateEmail = [required("Email is required"), email("Must be a valid email address")];
const validatePassword = [
  required("Password is required"),
  minLength(8, "Password must be at least 8 characters long"),
  regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/,
    "Password must contain uppercase, lowercase, number and special character",
  ),
];

const RegistrationPage = () => {
  const [loading, setLoading] = useSafeSetState<boolean>(false);
  const [isRegistered, setIsRegistered] = useSafeSetState<boolean>(false);
  const notify = useNotify();

  const handleSubmit = async (values: RegisterValues) => {
    setLoading(true);
    try {
      await httpClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          userName: values.email,
        }),
      });

      setIsRegistered(true);
      notify("Account created successfully!", { type: "success" });
    } catch (error: unknown) {
      setLoading(false);
      const err = error as HttpError;

      // ЛОГИКА ОБРАБОТКИ ОШИБОК БЭКЕНДА:
      // 1. Проверяем, есть ли массив ошибок от сервера
      if (err.body?.errors && Array.isArray(err.body.errors)) {
        // Выводим все ошибки через перенос строки или берем первую
        const serverMessage = err.body.errors.join(". ");
        notify(serverMessage, { type: "warning" });
      } else {
        // 2. Если бэкенд не прислал массив, выводим общую ошибку на английском
        notify("Registration failed. Please check your connection or try again later.", {
          type: "warning",
        });
      }

      console.error("Technical error details:", err.body);
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
      <Card sx={{ minWidth: 380, padding: "2em", borderRadius: "12px", boxShadow: 3 }}>
        {!isRegistered ? (
          <>
            <Box sx={{ textAlign: "center", marginBottom: "1.5em" }}>
              <Typography variant="h5" fontWeight="bold">
                Admin Panel
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create a new account
              </Typography>
            </Box>

            <Form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextInput
                  source="email"
                  label="Email (Login)"
                  type="email"
                  fullWidth
                  validate={validateEmail}
                />
                <PasswordInput
                  source="password"
                  label="Password"
                  fullWidth
                  validate={validatePassword}
                />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  * Use at least 8 characters with a mix of letters, numbers & symbols.
                </Typography>
              </Box>
              <CardActions sx={{ padding: "1.5em 0 0 0" }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  label={loading ? "Processing..." : "Register"}
                  sx={{ width: "100%", py: 1 }}
                />
              </CardActions>
            </Form>
          </>
        ) : (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#10b981", mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Success!
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Your account has been created.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              label="Back to Login"
              onClick={() => (window.location.href = "#/login")}
              sx={{ width: "100%", py: 1 }}
            />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default RegistrationPage;
