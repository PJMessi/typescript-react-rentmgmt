import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Link,
} from '@material-ui/core';
import moment from 'moment';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { requestForFamilies } from '../../redux/familySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatFamilyDate = (date: Date): string => {
  return moment(date).format('MMMM Do YYYY').toString();
};

const Family = (): JSX.Element => {
  const { families } = useAppSelector((state) => state.family);
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(requestForFamilies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Family ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Rent Amount&nbsp;(NPR)</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Started Date</TableCell>
              <TableCell align="left">Room</TableCell>
              <TableCell align="left">Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {families.map((family) => {
              return (
                <TableRow key={family.id}>
                  <TableCell component="th" scope="row">
                    {family.id}
                  </TableCell>
                  <TableCell align="left">{family.name}</TableCell>
                  <TableCell align="left">{family.amount}</TableCell>
                  <TableCell align="left">
                    <Chip
                      variant="outlined"
                      size="small"
                      label={family.status}
                      color={
                        family.status === 'ACTIVE' ? 'primary' : 'secondary'
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    {formatFamilyDate(family.createdAt)}
                  </TableCell>
                  <TableCell align="left">
                    <Link href="/" variant="body2">
                      {family.room ? family.room.name : '-'}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    <Link
                      component={RouterLink}
                      to={`families/${family.id}/members`}
                      variant="body2"
                    >
                      Show members
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

export default Family;
