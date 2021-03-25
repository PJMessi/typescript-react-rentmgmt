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
import { useEffect } from 'react';
import moment from 'moment';
import { requestForInvoices } from '../../redux/invoiceSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatInvoiceDate = (date: Date): string => {
  return moment(date).format('MMMM Do YYYY').toString();
};

const Invoice = (): JSX.Element => {
  const { invoices } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(requestForInvoices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell align="left">Family</TableCell>
              <TableCell align="left">Amount&nbsp;(NPR)</TableCell>
              <TableCell align="left">From</TableCell>
              <TableCell align="left">To</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => {
              return (
                <TableRow key={invoice.id}>
                  <TableCell component="th" scope="row">
                    {invoice.id}
                  </TableCell>
                  <TableCell align="left">
                    <Link href="/" variant="body2">
                      {invoice.family.name}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{invoice.amount}</TableCell>
                  <TableCell align="left">
                    {formatInvoiceDate(invoice.startDate)}
                  </TableCell>
                  <TableCell align="left">
                    {formatInvoiceDate(invoice.endDate)}
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      variant="outlined"
                      size="small"
                      label={invoice.status}
                      color={
                        invoice.status === 'PENDING' ? 'primary' : 'secondary'
                      }
                    />
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

export default Invoice;
