import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';
import useStyles from './styles';

type PropType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ open, setOpen }: PropType): JSX.Element => {
  const location = useLocation();
  const classes = useStyles();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            component={RouterLink}
            to="/"
            button
            selected={location.pathname === '/'}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem
            component={RouterLink}
            to="/families"
            button
            selected={location.pathname.startsWith('/families')}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Families" />
          </ListItem>

          <ListItem
            component={RouterLink}
            to="/rooms"
            button
            selected={location.pathname === '/rooms'}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItem>

          <ListItem
            component={RouterLink}
            to="/invoices"
            button
            selected={location.pathname === '/invoices'}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
