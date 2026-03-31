import { useNotify, useSafeSetState, Form, TextInput, PasswordInput, Button } from "react-admin";
import { Box, Card, CardActions, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { httpClient } from "./httpClient";

interface RegisterValues {
  email?: string;
  password?: string;
}

interface HttpError {
  status: number;
  message: string;
  body?: { message?: string; errors?: string[] };
}

const RegistrationPage = () => {
  const [loading, setLoading] = useSafeSetState<boolean>(false);
  const [isRegistered, setIsRegistered] = useSafeSetState<boolean>(false);
  const notify = useNotify();

  const handleSubmit = async (values: RegisterValues) => {
    if (!values.email || !values.password) return;
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

      // Вместо редиректа и записи токена, переключаем состояние
      setIsRegistered(true);
      notify("Account created successfully!", { type: "success" });
    } catch (error: unknown) {
      setLoading(false);
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
      <Card sx={{ minWidth: 350, padding: "2em", borderRadius: "12px", boxShadow: 3 }}>
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
          </>
        ) : (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#10b981", mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Success!
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Your account has been created. Now you can log in with your credentials.
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
