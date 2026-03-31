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

// Интерфейс для значений формы
interface RegisterValues {
  email?: string;
  password?: string;
}

// Интерфейс для структуры ошибок API
interface HttpError {
  status: number;
  message: string;
  body?: {
    message?: string;
    errors?: string[];
  };
}

// Правила валидации
const validateEmail = [required("Email is required"), email("Must be a valid email address")];

const validatePassword = [
  required("Password is required"),
  minLength(8, "Password must be at least 8 characters long"),
  regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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

      // Безопасное приведение типа для ошибки
      const err = error as HttpError;
      const errorMessage = err.body?.message || err.message || "Registration failed";

      notify(errorMessage, { type: "warning" });
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
                  * Password must be 8+ chars with uppercase, digit and symbol.
                </Typography>
              </Box>
              <CardActions sx={{ padding: "1.5em 0 0 0" }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  label={loading ? "Checking..." : "Register"}
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
              label="Go to Login"
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
