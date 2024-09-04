const grid = {
    center: {
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
    },
    start: {
        display: "grid",
        alignItems: "center",
        justifyContent: "start",
    },
    end: {
        display: "grid",
        alignItems: "center",
        justifyContent: "end",
    },
    colFlow: {
        gridAutoFlow: "column",
        gridColumnGap: "0.5rem",
    },
    rowFlow: {
        gridAutoFlow: "row",
        gridRowGap: "0.5rem",
    },
    gapS: {
        gridColumnGap: "0.5rem",
        gridRowGap: "0.5rem",
    },
    gapM: {
        gridColumnGap: "1rem",
        gridRowGap: "1rem",
    },
    gapL: {
        gridColumnGap: "2rem",
        gridRowGap: "2rem",
    },
    noGap: {
        gridColumnGap: 0,
        gridRowGap: 0,
    }
}

const flexbox = {
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    start: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    end: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    spaceBetween: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    gapS: {
        gridColumnGap: "0.5rem",
        gridRowGap: "0.5rem",
    },
    gapM: {
        gridColumnGap: "1rem",
        gridRowGap: "1rem",
    },
    gapL: {
        gridColumnGap: "2rem",
        gridRowGap: "2rem",
    },
    noGap: {
        gridColumnGap: 0,
        gridRowGap: 0,
    }
}

const truncateText = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
}

export default {grid, flexbox, truncateText}