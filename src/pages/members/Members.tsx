import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { requestForFamily } from '../../redux/familySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { Family } from '../../redux/familySlice';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatFamilyDate = (date: Date): string => {
  return moment(date).format('MMMM Do YYYY').toString();
};

const Members = (): JSX.Element => {
  const { familyId }: { familyId: string } = useParams();

  const classes = useStyles();

  const { families } = useAppSelector((state) => state.family);
  const dispatch = useAppDispatch();

  const family = useMemo((): Family | undefined => {
    return families.find(
      (stateFamily) => stateFamily.id === parseInt(familyId, 10)
    );
  }, [families, familyId]);

  useEffect(() => {
    dispatch(requestForFamily(parseInt(familyId, 10)));
  }, [familyId, dispatch]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Member ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Birthday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {family &&
              family.members &&
              family.members.map((member) => {
                return (
                  <TableRow key={member.id}>
                    <TableCell component="th" scope="row">
                      {member.id}
                    </TableCell>
                    <TableCell align="left">{member.name}</TableCell>
                    <TableCell align="left">{member.mobile}</TableCell>
                    <TableCell align="left">{member.email}</TableCell>
                    <TableCell align="left">
                      {formatFamilyDate(member.birthDay)}
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

export default Members;
