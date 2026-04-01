import { Login, LoginForm } from "react-admin";
import { Box, Card, Typography } from "@mui/material";

/**
 * Компактная страница входа.
 * Ссылка на регистрацию перенесена наверх, чтобы она не скрывалась при прокрутке.
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
          marginTop: "1em", // Уменьшили отступ сверху
        }}
      >
        <Card sx={{ minWidth: 350, padding: "1.2em", borderRadius: "12px", boxShadow: 3 }}>
          <Box sx={{ textAlign: "center", marginBottom: "0.5em" }}>
            <Typography variant="h5" fontWeight="bold">
              Admin Panel
            </Typography>
            {/* Перенесли ссылку наверх для лучшей видимости */}
            <Typography variant="body2" color="textSecondary">
              Sign in or{" "}
              <a
                href="#/register"
                style={{
                  textDecoration: "none",
                  color: "#3b82f6",
                  fontWeight: 600,
                }}
              >
                Register now
              </a>
            </Typography>
          </Box>

          {/* Сама форма логина */}
          <LoginForm
            sx={{
              "& .MuiCardContent-root": { padding: "8px 16px" }, // Сужаем внутренние отступы формы
              "& .MuiButton-root": { marginTop: "1em" },
            }}
          />
        </Card>
      </Box>
    </Login>
  );
};

export default LoginPage;
