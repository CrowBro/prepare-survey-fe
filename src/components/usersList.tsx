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
import { getUsers, User, saveUser } from "dataAccess/api";
import Chip from "@material-ui/core/Chip";
import { apiConfig } from "dataAccess/apiConfig";
import { TabBarIOS } from "react-native";
import { TableSortLabel } from "@material-ui/core";
import { string } from "prop-types";
import UserDetails from "components/userDetails"

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

type ListType = "users";

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

    let composedHeadCells: (HeadCell)[] = [headCells[0],headCells[1], headCells[2], headCells[3]];
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
    const [user, setUser] = useState<User>()
    const [listType, setListType] = useState<ListType>("users");

    function handleRequestSort(event: React.MouseEvent<HTMLButtonElement>, property: HeaderCellId) {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    }

    useEffect(() => {
        getUsers(authHeader, currentCountry)
            .then((resp) => setUsers(resp));
    }, [currentCountry]);

    const onChange = React.useCallback(
        (user: User) => {
            setUsers(users => users.map(x => x.userId === user.userId ? user : x));
        },
        [setUsers],
    );

    return (
        <Paper className={`${classes.root} ${classes.marginTop}`}>
            <Table size="medium">
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    listType={listType}
                />
                <TableBody className={classes.body}>
                    {stableSort(users, getSorting(order, orderBy))
                        .map(user => (
                            <TableRow
                                key={user.userId}
                                tabIndex={-1}
                                onClick={() => { }}>
                                <UserDetails user={user}
                                    authHeader={authHeader}
                                    currentCountry={currentCountry}
                                    onChange={onChange}
                                />
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withRouter(UsersList);
