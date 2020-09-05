import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getUsers, User } from "dataAccess/api";
import Chip from "@material-ui/core/Chip";
import { apiConfig } from "dataAccess/apiConfig";
import { TabBarIOS } from "react-native";
import { TableSortLabel } from "@material-ui/core";
import { string } from "prop-types";

const useStyles = makeStyles({
    root: {
        margin: "20px",
        padding: "20px",
    },
    chipOrange: {
        backgroundColor: "#FF6633",
    },
    chipRed: {
        backgroundColor: "#FF0000",
    },
    header: {
        "& th": {
            color: "rgba(0, 0, 0, 0.9)",
            backgroundColor: "#F2F3F8 !important",
            fontWeight: 700,
            lineHeight: "3rem"
        }
    },
    body: {
        cursor: "pointer"
    },
    marginTop: {
        marginTop: "72px",
    },
})

const StatusChip = ({ status }: { status: "To Review" | "Pending" | "Approved" | "Disabled" }) => {
    const classes = useStyles();
    switch (status) {
        case "Approved":
            return (
                <Chip
                    size="small"
                    color="primary"
                    label={status}
                />
            )
        case "Pending":
            return (
                <Chip
                    size="small"
                    color="default"
                    label={status}
                />
            )
        case "Disabled":
            return (
                <Chip
                    size="small"
                    color="secondary"
                    label={status}
                    className={classes.chipRed}
                />
            )
        case "To Review":
            return (
                <Chip
                    size="small"
                    color="secondary"
                    label={status}
                    className={classes.chipOrange}
                />
            )
    }
}

type ListType = "users";

const TableValues = ({ listType, user }: { listType: ListType; user: User }) => {
    switch (listType) {
        case "users": {
            return (
                <>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                </>
            )
        }
    }
    return <></>
}


type HeaderCellId = "userId" | "name" | "email" | "role";

type HeaderCellLabel ="User Id" |"Name" | "E-Mail" | "Role";

interface HeadCell {
    id: HeaderCellId;
    label: HeaderCellLabel;
    selector: (user: User) => number | (string | undefined);
}


const headCells: HeadCell[] = [
    { id: "userId", label: "User Id", selector: (user: User) => user.userId },
    { id: "name", label: "Name", selector: (user: User) => user.name },
    { id: "email", label: "E-Mail", selector: (user: User) => user.email },
    { id: "role", label: "Role", selector: (user: User) => user.name },
];

const reA = /[^a-zA-Z]/g;
const reN = /[^0-9]/g;

function sortAlphaNum(a: string, b: string) {
    const aA = a.replace(reA, "");
    const bA = b.replace(reA, "");
    if (aA === bA) {
        const aN = parseInt(a.replace(reN, ""), 10);
        const bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
}

function desc(a: User, b: User, orderBy: HeaderCellId) {
    const headCell = headCells[headCells.findIndex(x => x.id === orderBy)];
    const valueA = headCell.selector(a) || "";
    const valueB = headCell.selector(b) || "";

    if (orderBy === "name" && typeof valueA === "string" && typeof valueB === "string") {
        return -sortAlphaNum(valueA, valueB)
    }

    if (valueB < valueA) {
        // console.log(`A: ${valueA}, B ${valueB}. returning -1. A > B`)
        return -1;
    }
    if (valueB > valueA) {
        // console.log(`A: ${valueA}, B ${valueB}. returning 1. A < B`)
        return 1;
    }
    return 0;
}

function getSorting(order: string, orderBy: HeaderCellId) {
    console.log("sorting by: ", orderBy);
    return order === "desc" ? (a: User, b: User) => desc(a, b, orderBy) : (a: User, b: User) => -desc(a, b, orderBy);
}

function stableSort(array: User[], cmp: (a: User, b: User) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a: [User, number], b: [User, number]) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: [User, number]) => el[0]);
}

interface TableHeadPros {
    order: "desc" | "asc";
    orderBy: string;
    onRequestSort: (event: React.MouseEvent<HTMLButtonElement>, property: string) => any;
    listType: ListType;
}


function EnhancedTableHead(props: TableHeadPros) {
    const { order, orderBy, onRequestSort, listType } = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        onRequestSort(event, property);
    };
    // const classes = useStyles();

    let composedHeadCells: (HeadCell)[] = [headCells[1], headCells[2], headCells[3]];
    switch (listType) {
        case "users":
            // composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "name")]);
            // composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "email")]);
            // composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "role")]);
            break;
        default:
            break;
    }
    //composedHeadCells.push(headCells[headCells.length - 1])

    return (
        <TableHead>
            <TableRow>
                {composedHeadCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {/* {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null} */}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const UsersList = (props: RouteComponentProps) => {

    let currentCountry = "";
    let authHeader = "";
    if (props.location.state != null) {
        currentCountry = props.location.state.countrySpace;
        authHeader = props.location.state.authHeader;
    } else {
        currentCountry = apiConfig.defaultCountrySpace;
    }
    const classes = useStyles();
    const [order, setOrder] = useState<"desc" | "asc">("asc");
    const [orderBy, setOrderBy] = useState<HeaderCellId>("name");

    const [users, setUsers] = useState<User[]>([])
    const [listType, setListType] = useState<ListType>("users");

    function handleRequestSort(event: React.MouseEvent<HTMLButtonElement>, property: HeaderCellId) {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    }

    const handleChange = (value: ListType) => {
        setListType(value);
    }

    useEffect(() => {
        getUsers(authHeader, currentCountry)
            .then((resp) => setUsers(resp));
    }, [currentCountry]);

    return (
        <Paper className={`${classes.root} ${classes.marginTop}`}>
            <ButtonGroup size="medium" aria-label="Select table view mode">
                <Button onClick={() => handleChange("users")} disabled={listType === "users"} variant="text"><b>Users</b></Button>
            </ButtonGroup>

            <Table size="medium">
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    listType={listType}
                />
                <TableBody className={classes.body}>
                    {/* users */}
                    {stableSort(users, getSorting(order, orderBy))
                        .map(user => (
                            <TableRow
                                key={user.userId}
                                tabIndex={-1}
                                onClick={event =>
                                    props.history.push({
                                        pathname: `/users/${user.userId}`,
                                        state: { countrySpace: currentCountry, authHeader: authHeader }
                                    })}>
                                <TableValues listType={listType} user={user} />
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withRouter(UsersList);
