import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getSports, Sport } from "dataAccess/api";
import Chip from "@material-ui/core/Chip";
import { apiConfig } from "dataAccess/apiConfig";

const useStyles = makeStyles({
    root: {
        margin: "20px",
        padding: "20px",
    },
    chipOrange: {
        backgroundColor: "#FF6633",
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

const StatusChip = ({ status }: { status: "Approved" | "Pending" | "To Review" }) => {
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
    const [sports, setSports] = useState<Sport[]>([])
    const [listType, setListType] = useState<ListType>("categories");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleChange = (value: ListType) => {
        setListType(value);
        setAnchorEl(null);
    }

    const handleClose = (value: ListType) => {
        setAnchorEl(null);
    }

    useEffect(() => {
        getSports(authHeader, currentCountry)
            .then((resp) => setSports(resp))
            .catch(err => {
                // for (var prop in err) {
                //     if (Object.prototype.hasOwnProperty.call(err, prop)) {
                //         console.log(prop, "::", err[prop]);
                //     }
                // }

                if (err.response != null && err.response.status == 401) {
                    props.history.push({
                        pathname: "/auth",
                        state: { countrySpace: currentCountry, authHeader: authHeader }
                    })
                }

            });
    }, [currentCountry]);

    return (
        <Paper className={`${classes.root} ${classes.marginTop}`}>
            {/* <>{isLoaderVisible ? Loader() : null}</> */}
            <Button onClick={handleClick}>
                Choose sport list
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleChange("categories")}>Product Categories</MenuItem>
                <MenuItem onClick={() => handleChange("brands")}>Brands</MenuItem>
                <MenuItem onClick={() => handleChange("misc")}>Miscelanious</MenuItem>
            </Menu>

            <Table size="medium">
                <TableHead className={classes.header}>
                    <TableRow className={classes.header}>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <HeaderTitles listType={listType} />
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.body}>
                    {sports.map(sport => (
                        <TableRow key={sport.sportId} onClick={event =>
                            props.history.push({
                                pathname: `/sports/${sport.sportId}`,
                                state: { countrySpace: currentCountry, authHeader: authHeader }
                            })}>
                            <TableCell>{sport.sportDisplayId}</TableCell>
                            <TableCell>{sport.sportName}</TableCell>
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
