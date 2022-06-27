import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  ListItemIcon,
  Icon,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from '../../contexts';

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  label,
  icon,
  to,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleCLick = () => {
    navigate(to);
    onClick?.(); // Executa se não for undefined por causa do ?.
  };

  return (
    <ListItemButton selected={!!match} onClick={handleCLick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
              }}
              src="https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?cs=srgb&dl=pexels-yaroslav-shuraev-1834399.jpg&fm=jpg"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  label={drawerOption.label}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
