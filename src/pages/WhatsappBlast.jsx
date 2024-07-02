import { Box, Button } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import useWindowSize from "../hooks/useWindowSize";

export default function WhatsappBlast() {
    const [columnWidths, setColumnWidths] = React.useState([100, 100, 100]);
    const [currentColumn, setCurrentColumn] = React.useState(0);
    const [columnsDisplays, setColumnDisplays] = React.useState([true, true, true]);

    const windowSize = useWindowSize();

    const isMobileView = useMemo(() => {
        return windowSize.width < 600;
    }, [windowSize]);

    useEffect(() => {
        const totalWidth = windowSize.width;
        console.log(totalWidth);

        if (totalWidth < 600) {
            let columnDisplays = [false, false, false];
            columnDisplays[currentColumn] = true;
            setColumnDisplays(columnDisplays);

            let columnWidths = [0, 0, 0];
            columnWidths[currentColumn] = totalWidth;
            setColumnWidths(columnWidths);
        } else {
            setColumnDisplays([true, true, true]);
            const columnCount = columnWidths.length;
            const newColumnWidths = Array(columnCount).fill(totalWidth / columnCount);
            setColumnWidths(newColumnWidths);
        }

        //
    }, [windowSize, currentColumn]);

    return (
        <Box display="flex" height={`calc(${windowSize.height}px - 58px)`}>
            <Box
                flexDirection={"column"}
                width={columnWidths[0]}
                height="100%"
                display={columnsDisplays[0] ? "flex" : "none"}
            >
                <Box display={isMobileView ? "flex" : "none"}>
                    <Button onClick={() => setCurrentColumn(1)}>Next</Button>
                </Box>
                <Box>A</Box>
                <Box>A</Box>
                <Box>A</Box>
            </Box>
            <Box
                flexDirection={"column"}
                width={columnWidths[1]}
                height="100%"
                display={columnsDisplays[1] ? "flex" : "none"}
            >
                <Box display={isMobileView ? "flex" : "none"}>
                    <Button onClick={() => setCurrentColumn(0)}>Back</Button>
                    <Button onClick={() => setCurrentColumn(2)}>Next</Button>
                </Box>
                <Box>B</Box>
                <Box>B</Box>
                <Box>B</Box>
                <Box>B</Box>
            </Box>
            <Box
                display={columnsDisplays[2] ? "flex" : "none"}
                flexDirection={"column"}
                width={columnWidths[2]}
                height="100%"
            >
                <Box display={isMobileView ? "flex" : "none"}>
                    <Button onClick={() => setCurrentColumn(1)}>Back</Button>
                </Box>
                <Box>C</Box>
                <Box>C</Box>
                <Box>C</Box>
                <Box>C</Box>
            </Box>
        </Box>
    );
}
