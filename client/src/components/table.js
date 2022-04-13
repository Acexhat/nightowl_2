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
import { TableSortLabel } from '@mui/material';

const columns = [
    { id: 'id', label: 'Order No.', minWidth: 170 },
    { id: 'customer_name', label: 'Customer Name', minWidth: 100 },
    {
        id: 'pickup_location',
        label: 'Pickup Location',
        minWidth: 130,
        align: 'left',
    },
    {
        id: 'name',
        label: 'Product',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'total',
        label: 'Product Cost',
        minWidth: 130,
        align: 'left',
    },
    {
        id: 'payment_status',
        label: 'Payment Status',
        minWidth: 130,
        align: 'left',
    },
];

const useStyles = makeStyles({
    root: {
        width: '95%',
        boxShadow: "7px 10px 20px grey"
        // height:"88%"
    },
    trow: {
        height: "0.5rem"
    },
    headerRoot: {
        "& .MuiTableCell-root": {
            fontWeight: "800"
        }
    },
    container: {
        minHeight: 520,
        maxHeight: 520,
        // borderRadius: "2rem"
    },
    nodata: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "32.5rem",
        color: "#877f7f",
        fontWeight: "750",
        fontSize: "2.5rem"
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
    const {
        classes,
        order,
        orderBy,
        onRequestSort
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    return (
        <TableHead className={classes.headerRoot}>
            <TableRow style={{ backgroundColor: "rgb(175 221 214)" }}>
                {columns.map(column => (
                    <TableCell
                        align={column.align}
                        style={{
                            minWidth: column.minWidth,
                            fontWeight: "800"
                        }}
                        key={column.id}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={createSortHandler(column.id)}
                            style={{ fontWeight: "800" }}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function TableDetails({ originalRows, getMoreOrder }) {
    const classes = useStyles();
    const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searched, setSearched] = React.useState("");
    const [rows, setRows] = React.useState(originalRows);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("total");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

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
                {rows.length > 0 ? <Table stickyHeader aria-label="sticky table">
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {(stableSort(rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), getComparator(order, orderBy)).map((row, index) => {
                            return (
                                <TableRow className={classes.trow} style={index % 2 ? { background: "white" } : { background: "#def0f7" }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = column.id === "name" ? row.products[0][column.id] : row[column.id];
                                        return (
                                            column.id === "id" ? <TableCell style={{
                                                // textDecoration: "underline",
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
                            )
                        }))}
                    </TableBody>
                </Table> : <div className={classes.nodata}>
                    No Data Found
                </div>}
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
