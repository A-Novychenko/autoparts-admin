import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import { LogoutBtn } from '@/components/ui';
import { UserInfo } from '@components/base';

import logo from '@assets/logo.png';

import staticData from '@/data/common.json';

import { MainNavLink } from './AppBar.styled';

export const AppBar = () => {
  const { mainNavLinks } = staticData;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <MUIAppBar position="static" sx={{ backgroundColor: '#101340' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} width={60} height={60} alt="логотип" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {mainNavLinks.map(({ name, link }, idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                  <NavLink to={link} style={{ textAlign: 'center' }}>
                    {name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {mainNavLinks.map(({ name, link }, idx) => (
              <MainNavLink key={idx} to={link}>
                {name}
              </MainNavLink>
            ))}
          </Box>

          <UserInfo />

          <Box sx={{ flexGrow: 0 }}>
            <LogoutBtn />
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
