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
import { useDrawerContext } from '../../contexts';

export const MenuLateral: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen  } = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen} >
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
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
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
