import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router';
import SearchBar from "material-ui-search-bar";

const columns = [
    { id: 'id', label: 'Order No.', minWidth: 170 },
    { id: 'customer_name', label: 'Customer Name', minWidth: 100 },
    {
        id: 'pickup_location',
        label: 'Pickup Location',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'name',
        label: 'Product',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'total',
        label: 'Product Cost',
        minWidth: 130,
        align: 'right',
    },
    {
        id: 'payment_status',
        label: 'Payment Status',
        minWidth: 130,
        align: 'right',
    },
];

const useStyles = makeStyles({
    root: {
        width: '95%',
        // height:"88%"
    },
    headerRoot: {
        "& .MuiTableCell-root": {
            fontWeight: "800"
        }
    },
    container: {
        minHeight: 500,
        maxHeight: 500,
        borderRadius: "2rem"
    },
});

export default function TableDetails({ originalRows, getMoreOrder }) {
    const classes = useStyles();
    const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searched, setSearched] = React.useState("");
    const [rows, setRows] = React.useState(originalRows);

    const handleChangePage = (event, newPage) => {
        getMoreOrder(newPage);
        setPage(newPage);
    };

    React.useEffect(() => {
        setRows(originalRows);
    }, [originalRows])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOrderClicked = (event, row) => {
        event.preventDefault();
        navigate(`/order/${row.id}`, {
            state: row
        })
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            console.log(row);
            return row.customer_name.includes(searchedVal) || row.pickup_location.includes(searchedVal);
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <Paper className={classes.root}>
            <SearchBar
                style={{
                    marginBottom: "0.1rem"
                }}
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className={classes.headerRoot}>
                        <TableRow style={{ backgroundColor: "rgb(175 221 214)" }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow style={index % 2 ? { background: "white" } : { background: "rgb(175 221 214)" }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = column.id === "name" ? row.products[0][column.id] : row[column.id];
                                        return (
                                            column.id === "id" ? <TableCell style={{
                                                textDecoration: "underline",
                                                fontWeight: "600",
                                                color: "blue",
                                                cursor: "pointer"
                                            }} key={column.id} align={column.align} onClick={(e) => handleOrderClicked(e, row)}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                                :
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
