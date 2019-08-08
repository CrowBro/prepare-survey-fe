import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getSports, Sport } from "dataAccess/api";

const SportsList = (props: RouteComponentProps) => {
    const [ sports, setSports ] = useState<Sport[]>([])
    useEffect(() => {
        getSports()
            .then((resp) => setSports(resp));
    }, []);

    return (
        <Paper>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Sport ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Product 1</TableCell>
                        <TableCell>Product 2</TableCell>
                        <TableCell>Product 3</TableCell>
                        <TableCell>Product 4</TableCell>
                        <TableCell>Product 5</TableCell>
                        <TableCell>Product 6</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sports.map(sport => (
                        <TableRow key={sport.sportId} onClick={event => props.history.push(`/sports/${sport.sportId}`)}>
                            <TableCell>{sport.sportDisplayId}</TableCell>
                            <TableCell>{sport.sportName}</TableCell>
                            <TableCell>{sport.products[0]}</TableCell>
                            <TableCell>{sport.products[1]}</TableCell>
                            <TableCell>{sport.products[2]}</TableCell>
                            <TableCell>{sport.products[3]}</TableCell>
                            <TableCell>{sport.products[4]}</TableCell>
                            <TableCell>{sport.products[5]}</TableCell>
                            <TableCell>{sport.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withRouter(SportsList);
