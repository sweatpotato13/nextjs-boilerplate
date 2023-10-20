import {
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { ILogin } from "./Login.interface";

const theme = createTheme();

function VLogin(props: ILogin.IVProps) {
    const { onLogin, register } = props;

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Hello 🤣
                    </Typography>
                    <form>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="account"
                            autoComplete="accountName"
                            autoFocus
                            {...register("accountName")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            {...register("password")}
                        />
                        <Stack direction={"row"} spacing={{ xs: 2, md: 4 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    color: "white",
                                    backgroundColor: "black",
                                }}
                                href="/auth/register"
                            >
                                Register
                            </Button>
                            <Button
                                onClick={onLogin}
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    color: "white",
                                    backgroundColor: "black",
                                }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default VLogin;
