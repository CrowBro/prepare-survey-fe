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
import { getSports, Sport } from "dataAccess/api";
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
    // visuallyHidden: {
    //     border: 0,
    //     clip: 'rect(0 0 0 0)',
    //     height: 1,
    //     margin: -1,
    //     overflow: 'hidden',
    //     padding: 0,
    //     position: 'absolute',
    //     top: 20,
    //     width: 1,
    // },
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

type ListType = "categories" | "brands" | "misc";

const HeaderTitles = ({ listType }: { listType: ListType }) => {
    switch (listType) {
        case "categories": {
            return (
                <>
                    <TableCell>Product 1</TableCell>
                    <TableCell>Product 2</TableCell>
                    <TableCell>Product 3</TableCell>
                    <TableCell>Product 4</TableCell>
                    <TableCell>Product 5</TableCell>
                    <TableCell>Product 6</TableCell>
                </>
            )
        }
        case "brands": {
            return (
                <>
                    <TableCell>Brand Passion</TableCell>
                    <TableCell>Competitor 1</TableCell>
                    <TableCell>Competitor 2</TableCell>
                    <TableCell>Competitor 3</TableCell>
                    <TableCell>Competitor 4</TableCell>
                    <TableCell>Competitor 5</TableCell>
                    <TableCell>Competitor 6</TableCell>
                </>
            )
        }
        case "misc": {
            return (
                <>
                    <TableCell>NPS 2017</TableCell>
                    <TableCell>№ Respondents</TableCell>
                    <TableCell>Leader Sport</TableCell>
                    <TableCell>Video Note</TableCell>
                    <TableCell>NPS 2018</TableCell>
                    <TableCell>№ Respondents</TableCell>
                </>
            )
        }
    }
    return <></>
}

const TableValues = ({ listType, sport }: { listType: ListType; sport: Sport }) => {
    switch (listType) {
        case "categories": {
            return (
                <>
                    <TableCell>{sport.products[0]}</TableCell>
                    <TableCell>{sport.products[1]}</TableCell>
                    <TableCell>{sport.products[2]}</TableCell>
                    <TableCell>{sport.products[3]}</TableCell>
                    <TableCell>{sport.products[4]}</TableCell>
                    <TableCell>{sport.products[5]}</TableCell>
                </>
            )
        }
        case "brands": {
            return (
                <>
                    <TableCell>{sport.passionBrand}</TableCell>
                    <TableCell>{sport.brands[0]}</TableCell>
                    <TableCell>{sport.brands[1]}</TableCell>
                    <TableCell>{sport.brands[2]}</TableCell>
                    <TableCell>{sport.brands[3]}</TableCell>
                    <TableCell>{sport.brands[4]}</TableCell>
                    <TableCell>{sport.brands[5]}</TableCell>
                </>
            )
        }
        case "misc": {
            return (
                <>
                    <TableCell>{sport.nps2017}</TableCell>
                    <TableCell>{sport.noRespondents2017}</TableCell>
                    <TableCell>{sport.sportLeader}</TableCell>
                    <TableCell>{sport.videoNote ? "OUI" : "NON"}</TableCell>
                    <TableCell>{sport.nps2018}</TableCell>
                    <TableCell>{sport.noRespondents2018}</TableCell>
                </>
            )
        }
    }
    return <></>
}


type HeaderCellId = "sportId" | "sportDisplayId" | "sportName" | "defaultSportName" | "status" | "passionBrand" | "brands0" | "brands1" | "brands2" | "brands3" | "brands4" | "brands5" | "products0" | "products1" | "products2" | "products3" | "products4" | "products5" | "nps2017" | "noRespondents2017" | "sportLeader" | "videoNote" | "nps2018" | "noRespondents2018";

type HeaderCellLabel = null | "ID" | "Name" | "[Name]" | "Product 1" | "Product 2" | "Product 3" | "Product 4" | "Product 5" | "Product 6" | "Brand Passion" | "Competitor 1" | "Competitor 2" | "Competitor 3" | "Competitor 4" | "Competitor 5" | "Competitor 6" |  "№ Respondents" | "NPS 2017" | "Leader Sport" | "Video Note" | "NPS 2018" | "Status";

interface HeadCell {
    id: HeaderCellId;
    label: HeaderCellLabel;
    selector: (sport: Sport) => number | (string | undefined);
}


const headCells: HeadCell[] = [
    { id: "sportId", label: null, selector: (sport: Sport) => sport.sportId },
    { id: "sportDisplayId", label: "ID", selector: (sport: Sport) => sport.sportDisplayId },
    { id: "sportName", label: "Name", selector: (sport: Sport) => sport.sportName },
    { id: "defaultSportName", label: "[Name]", selector: (sport: Sport) => sport.defaultSportName },
    { id: "passionBrand", label: "Brand Passion", selector: (sport: Sport) => sport.passionBrand },
    { id: "brands0", label: "Competitor 1", selector: (sport: Sport) => sport.brands[0] },
    { id: "brands1", label: "Competitor 2", selector: (sport: Sport) => sport.brands[1] },
    { id: "brands2", label: "Competitor 3", selector: (sport: Sport) => sport.brands[2] },
    { id: "brands3", label: "Competitor 4", selector: (sport: Sport) => sport.brands[3] },
    { id: "brands4", label: "Competitor 5", selector: (sport: Sport) => sport.brands[4] },
    { id: "brands5", label: "Competitor 6", selector: (sport: Sport) => sport.brands[5] },
    { id: "products0", label: "Product 1", selector: (sport: Sport) => sport.products[0] },
    { id: "products1", label: "Product 2", selector: (sport: Sport) => sport.products[1] },
    { id: "products2", label: "Product 3", selector: (sport: Sport) => sport.products[2] },
    { id: "products3", label: "Product 4", selector: (sport: Sport) => sport.products[3] },
    { id: "products4", label: "Product 5", selector: (sport: Sport) => sport.products[4] },
    { id: "products5", label: "Product 6", selector: (sport: Sport) => sport.products[5] },
    { id: "nps2017", label: "NPS 2017", selector: (sport: Sport) => sport.sportDisplayId },
    { id: "noRespondents2017", label: "№ Respondents", selector: (sport: Sport) => sport.sportDisplayId },
    { id: "sportLeader", label: "Leader Sport", selector: (sport: Sport) => sport.sportDisplayId },
    { id: "videoNote", label: "Video Note", selector: (sport: Sport) => sport.sportDisplayId },
    { id: "nps2018", label: "NPS 2018", selector: (sport: Sport) => sport.sportDisplayId },
    { id: "noRespondents2018", label: "№ Respondents", selector: (sport: Sport) => sport.sportDisplayId },
    { id: "status", label: "Status", selector: (sport: Sport) => sport.status },
];

// function selectoras(cells: HeadCell[], id: HeaderCellId) {
//     const headCell = cells.find(x => x.id === id)
//     return !!headCell ? headCell.selector : null;
// }
// function label(cells: HeadCell[], id: HeaderCellId) {
//     const headCell = cells.find(x => x.id === id)
//     return !!headCell ? headCell.label : null;
// }

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

function desc(a: Sport, b: Sport, orderBy: HeaderCellId) {
    const headCell = headCells[headCells.findIndex(x => x.id === orderBy)];
    const valueA = headCell.selector(a) || "";
    const valueB = headCell.selector(b) || "";

    if (orderBy === "sportDisplayId" && typeof valueA === "string" && typeof valueB === "string") {
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
    return order === "desc" ? (a: Sport, b: Sport) => desc(a, b, orderBy) : (a: Sport, b: Sport) => -desc(a, b, orderBy);
}

function stableSort(array: Sport[], cmp: (a: Sport, b: Sport) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a: [Sport, number], b: [Sport, number]) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: [Sport, number]) => el[0]);
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
        case "categories":
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "products0")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "products1")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "products2")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "products3")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "products4")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "products5")]);
            break;
        case "brands":
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "passionBrand")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "brands0")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "brands1")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "brands2")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "brands3")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "brands4")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "brands5")]);
            break;
        case "misc":
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "nps2017")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "noRespondents2017")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "sportLeader")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "videoNote")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "nps2018")]);
            composedHeadCells.push(headCells[headCells.findIndex(x => x.id === "noRespondents2018")]);
            break;
        default:
            break;
    }
    composedHeadCells.push(headCells[headCells.length - 1])

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

const SportsList = (props: RouteComponentProps) => {

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
    const [orderBy, setOrderBy] = useState<HeaderCellId>("sportDisplayId");

    const [sports, setSports] = useState<Sport[]>([])
    const [listType, setListType] = useState<ListType>("categories");

    function handleRequestSort(event: React.MouseEvent<HTMLButtonElement>, property: HeaderCellId) {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    }

    const handleChange = (value: ListType) => {
        setListType(value);
    }

    useEffect(() => {
        getSports(authHeader, currentCountry)
            .then((resp) => setSports(resp));
    }, [currentCountry]);

    return (
        <Paper className={`${classes.root} ${classes.marginTop}`}>
            <ButtonGroup size="medium" aria-label="Select table view mode">
                <Button onClick={() => handleChange("categories")} disabled={listType === "categories"} variant="text"><b>Review Products</b></Button>
                <Button onClick={() => handleChange("brands")} disabled={listType === "brands"} variant="text"><b>Review Competitors</b></Button>
                <Button onClick={() => handleChange("misc")} disabled={listType === "misc"} variant="text"><b>Other Options</b></Button>
            </ButtonGroup>

            <Table size="medium">
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    listType={listType}
                />
                {/* <TableHead className={classes.header}>
                    <TableRow className={classes.header}>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>[Name]</TableCell>
                        <HeaderTitles listType={listType} />
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody className={classes.body}>
                    {/* sports */}
                    {stableSort(sports, getSorting(order, orderBy))
                        .map(sport => (
                            <TableRow
                                key={sport.sportId}
                                tabIndex={-1}
                                onClick={event =>
                                    props.history.push({
                                        pathname: `/sports/${sport.sportId}`,
                                        state: { countrySpace: currentCountry, authHeader: authHeader }
                                    })}>
                                <TableCell>{sport.sportDisplayId}</TableCell>
                                <TableCell>{sport.sportName}</TableCell>
                                <TableCell>{"[" + sport.defaultSportName + "]"}</TableCell>
                                <TableValues listType={listType} sport={sport} />
                                <TableCell><StatusChip status={sport.status} /></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withRouter(SportsList);
