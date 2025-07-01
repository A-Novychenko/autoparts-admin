// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';

// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';

// import { Copyright } from '@/components/ui/Copyright';

// import { login } from '@/redux/auth/authOperations';
// import { useAppDispatch } from '@/redux/hooks';

// export const LoginForm = () => {
//   const dispatch = useAppDispatch();

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const formattedData = {
//       login: data.get('login') as string,
//       password: data.get('password') as string,
//     };
//     console.log(formattedData);
//     dispatch(login(formattedData));
//   };

//   return (
//     <Grid container component="main" sx={{ height: '100vh', width: '100vw' }}>
//       <CssBaseline />
//       <Grid
//         item
//         xs={false}
//         sm={4}
//         md={7}
//         sx={{
//           backgroundImage: 'url(https://picsum.photos/3000/3000?random=7)',
//           backgroundRepeat: 'no-repeat',
//           backgroundColor: t =>
//             t.palette.mode === 'light'
//               ? t.palette.grey[50]
//               : t.palette.grey[900],
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       />
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <Box
//           sx={{
//             my: 8,
//             mx: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Логин
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="login"
//               label="Логин"
//               name="login"
//               autoComplete="login"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Пароль"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Войти
//             </Button>

//             <Copyright sx={{ mt: 5 }} />
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Copyright } from '@/components/ui/Copyright';
import { login } from '@/redux/auth/authOperations';
import { useAppDispatch } from '@/redux/hooks';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formattedData = {
      login: data.get('login') as string,
      password: data.get('password') as string,
    };

    dispatch(login(formattedData));
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://picsum.photos/3000/3000?random=7)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Вход
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Вход
            </Button>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
