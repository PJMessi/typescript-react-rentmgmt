import { Divider, Drawer, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from './styles';

type PropType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ open, setOpen }: PropType): JSX.Element => {
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
      </Drawer>
    </>
  );
};

export default Sidebar;
