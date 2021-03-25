import { useEffect } from 'react';
import {
  Chip,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { requestForRooms } from '../../redux/roomSlice';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Room = (): JSX.Element => {
  const { rooms } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(requestForRooms());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Price&nbsp;(NPR)</TableCell>
              <TableCell align="left">Family</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => {
              return (
                <TableRow key={room.id}>
                  <TableCell component="th" scope="row">
                    {room.id}
                  </TableCell>
                  <TableCell align="left">{room.name}</TableCell>
                  <TableCell align="left">{room.description}</TableCell>
                  <TableCell align="left">
                    <Chip
                      variant="outlined"
                      size="small"
                      label={room.status}
                      color={
                        room.status === 'OCCUPIED' ? 'primary' : 'secondary'
                      }
                    />
                  </TableCell>
                  <TableCell align="left">{room.price}</TableCell>
                  <TableCell align="left">
                    <Link href="/" variant="body2">
                      {room.family !== null ? room.family.name : '-'}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Room;
