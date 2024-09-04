import {createUseStyles} from "react-jss"

const useStyles = createUseStyles((theme) => ({
    root: {
        position: "relative"
    },
    inputWrapper: {
        ...theme.utils.flexbox.end,
        marginBottom: "0.5rem"
    },
    searchInput: ({renderMobileTable}) => ({
        width: renderMobileTable ? "100%" : "20rem",
        "& input": {
            padding: "0.5rem"
        }
    })
}))

export default useStyles