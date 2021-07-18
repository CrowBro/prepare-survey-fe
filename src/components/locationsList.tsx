import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getLocations, Location, saveLocation } from "dataAccess/api";
import { apiConfig } from "dataAccess/apiConfig";
import { TableSortLabel } from "@material-ui/core";
import LocationDetails from "components/locationDetails"

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

type ListType = "locations";

type HeaderCellId = "locationId" | "source" | "name" | "region"| "countryCode"| "isHidden";

type HeaderCellLabel ="Location Id" |"Source" |"Name" | "Region" | "Country Code" | "Is Hidden";

interface HeadCell {
    id: HeaderCellId;
    label: HeaderCellLabel;
    selector: (location: Location) => number | (string | undefined) | boolean;
}


const headCells: HeadCell[] = [
    { id: "locationId", label: "Location Id", selector: (location: Location) => location.locationId },
    { id: "source", label: "Source", selector: (location: Location) => location.source },
    { id: "name", label: "Name", selector: (location: Location) => location.name },
    { id: "region", label: "Region", selector: (location: Location) => location.region },
    { id: "countryCode", label: "Country Code", selector: (location: Location) => location.countryCode },
    { id: "isHidden", label: "Is Hidden", selector: (location: Location) => location.isHidden },
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

function desc(a: Location, b: Location, orderBy: HeaderCellId) {
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
    return order === "desc" ? (a: Location, b: Location) => desc(a, b, orderBy) : (a: Location, b: Location) => -desc(a, b, orderBy);
}

function stableSort(array: Location[], cmp: (a: Location, b: Location) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a: [Location, number], b: [Location, number]) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: [Location, number]) => el[0]);
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

    let composedHeadCells: (HeadCell)[] = [headCells[0],headCells[1], headCells[2], headCells[3], headCells[4], headCells[5]];
    switch (listType) {
        case "locations":
            // composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "name")]);
            break;
        default:
            break;
    }

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

const LocationsList = (props: RouteComponentProps) => {
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

    const [locations, setLocations] = useState<Location[]>([])
    const [location, setLocation] = useState<Location>()
    const [listType, setListType] = useState<ListType>("locations");

    function handleRequestSort(event: React.MouseEvent<HTMLButtonElement>, property: HeaderCellId) {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    }

    useEffect(() => {
        getLocations(authHeader, currentCountry)
            .then((resp) => setLocations([{locationId:0, source:"RETAIL" , name:"", region: "", countryCode:"",isHidden: false,}, ...resp]));
    }, [currentCountry]);

    const onChange = React.useCallback(
        (location: Location) => {
            setLocations(locations => locations.map(x => x.locationId === location.locationId ? location : x));
        },
        [setLocations],
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
                    <TableRow>
                    </TableRow>
                    {stableSort(locations, getSorting(order, orderBy))
                        .map(location => (
                            <TableRow
                                key={location.locationId}
                                tabIndex={-1}
                                onClick={() => { }}>
                                <LocationDetails location={location}
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

export default withRouter(LocationsList);
