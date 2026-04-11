import React from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    SxProps,
    Theme,
} from "@mui/material";

interface Column {
    label: string;
    key: string;
    center?: boolean;
}

interface TableCustomProps {
    columns: Column[];
    data: (Record<string, any> | 'gap')[];
    theadSx?: SxProps<Theme>;
    tbodySx?: SxProps<Theme>;
}

const TableCustom: React.FC<TableCustomProps> = ({ columns, data, theadSx, tbodySx }) => {
    return (
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <TableHead
                sx={[{
                    '& .MuiTableCell-root': {
                        background: 'rgba(0, 50, 20, 0.6) !important',
                        backdropFilter: 'blur(10px)',
                        color: '#ffd700',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '1vw',
                        borderBottom: 'none',
                        padding: '1.2vw 1vw',
                        '&:first-of-type': {
                            borderTopLeftRadius: '12px',
                            borderBottomLeftRadius: '12px',
                        },
                        '&:last-of-type': {
                            borderTopRightRadius: '12px',
                            borderBottomRightRadius: '12px',
                        }
                    }
                }, theadSx as any]}
            >
                <TableRow>
                    {columns.map((col) => (
                        <TableCell
                            key={col.key}
                            align={col.center ? "center" : "left"}
                        >
                            {col.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody sx={tbodySx}>
                {data.map((row, idx) => row === 'gap'
                    ? (
                        <TableRow key={`gap-${idx}`} sx={{ height: '1.5vw' }}>
                            <TableCell colSpan={columns.length} sx={{ border: 0, p: 0 }} />
                        </TableRow>
                    )
                    : (
                        <TableRow
                            key={idx}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(5px)',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'scale(1.002)',
                                },
                                '& .MuiTableCell-root': {
                                    color: 'white',
                                    borderBottom: 'none',
                                    padding: '0.8vw 1vw',
                                    fontSize: '0.9vw',
                                    '&:first-of-type': {
                                        borderTopLeftRadius: '10px',
                                        borderBottomLeftRadius: '10px',
                                    },
                                    '&:last-of-type': {
                                        borderTopRightRadius: '10px',
                                        borderBottomRightRadius: '10px',
                                    }
                                }
                            }}
                        >
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    align={col.center ? "center" : "left"}
                                >
                                    {row[col.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default TableCustom;
