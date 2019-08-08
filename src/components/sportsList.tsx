import * as React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getSports, Sport } from "dataAccess/api";

const useStyles = makeStyles({
    appBar: {
        width: "100%",
        display: "flex",
        zIndex: 1100,
        boxSizing: "border-box",
        flexShrink: 0,
        flexDirection: "column",
    }
})

const SportsList = (props: RouteComponentProps) => {
    const [ sports, setSports ] = useState<Sport[]>([])
    useEffect(() => {
        getSports()
            .then((resp) => setSports(resp));
    }, []);

    return (
        <Paper>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Sport ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Product 1</TableCell>
                        <TableCell align="right">Product 2</TableCell>
                        <TableCell align="right">Product 3</TableCell>
                        <TableCell align="right">Product 4</TableCell>
                        <TableCell align="right">Product 5</TableCell>
                        <TableCell align="right">Product 6</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sports.map(sport => (
                        <TableRow key={sport.sportId} onClick={event => props.history.push(`/sports/${sport.sportId}`)}>
                            <TableCell align="left">{sport.sportDisplayId}</TableCell>
                            <TableCell align="left">{sport.sportName}</TableCell>
                            <TableCell align="right">{sport.products[0]}</TableCell>
                            <TableCell align="right">{sport.products[1]}</TableCell>
                            <TableCell align="right">{sport.products[2]}</TableCell>
                            <TableCell align="right">{sport.products[3]}</TableCell>
                            <TableCell align="right">{sport.products[4]}</TableCell>
                            <TableCell align="right">{sport.products[5]}</TableCell>
                            <TableCell align="right">{sport.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withRouter(SportsList);
