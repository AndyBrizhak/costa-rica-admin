import { Login, LoginForm } from "react-admin";
import { Box, Card, Typography } from "@mui/material";

/**
 * Кастомная страница входа.
 * Мы оборачиваем стандартный LoginForm в наш макет,
 * чтобы добавить ссылку на регистрацию и выдержать единый стиль.
 */
const LoginPage = () => {
  return (
    <Login
      sx={{
        background: "linear-gradient(45deg, #1e293b 30%, #0f172a 90%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <Card sx={{ minWidth: 350, padding: "1.5em", borderRadius: "12px", boxShadow: 3 }}>
          <Box sx={{ textAlign: "center", marginBottom: "1em" }}>
            <Typography variant="h5" fontWeight="bold">
              Admin Panel
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please sign in to continue
            </Typography>
          </Box>

          {/* Стандартная форма логина, которая вызывает authProvider.login */}
          <LoginForm />

          <Box
            sx={{
              textAlign: "center",
              marginTop: "1.5em",
              borderTop: "1px solid #eee",
              paddingTop: "1em",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Don't have an account?
            </Typography>
            <Typography variant="body2">
              <a
                href="#/register"
                style={{
                  textDecoration: "none",
                  color: "#3b82f6",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                Register now
              </a>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Login>
  );
};

export default LoginPage;
