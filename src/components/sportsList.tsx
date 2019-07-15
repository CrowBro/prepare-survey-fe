import * as React from "react";
import { Paper, Table, TableCell, TableRow, TableHead } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Sport {
    id: number;
    name: string;
}

const sports: Sport[] = [
    { id: 1, name: "Hiking" },
    { id: 2, name: "Mountain biking" }
]

const SportsList = (props: RouteComponentProps) => {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                {sports.map(sport => (
                    <TableRow key={sport.id} onClick={event => props.history.push(`/sports/${sport.id}`)}>
                        <TableCell align="left">{sport.id}</TableCell>
                        <TableCell align="left">{sport.name}</TableCell>
                    </TableRow>
                ))}
            </Table>
        </Paper>
    )
}

export default withRouter(SportsList);
