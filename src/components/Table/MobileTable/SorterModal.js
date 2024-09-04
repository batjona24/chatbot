import Popover from "../../Popover"
import PropTypes from "prop-types"
import {createUseStyles} from "react-jss"
import Button from "../../Button"

const useStyles = createUseStyles((theme) => ({
    PopoverBody: {
      padding: [0, theme.spacing * 3]
    },
    option: {
        ...theme.utils.flexbox.center,
        height: theme.spacing * 6,
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
        fontSize: 14,
        fontWeight: 700,
        color: theme.palette.grey[800],
        ...theme.clickable
    }
}))

const SorterModal = ({
    onClose,
    title,
    options,
    sortColumnCb
}) => {
    const classes = useStyles()

    const onSetSorter = (option) => {
        sortColumnCb(option.value, 'desc')
        onClose()
    }

    return (
        <Popover
            onClose={onClose}
            title={title}
            maxWidth={400}
            bodyClassName={classes.PopoverBody}
        >
            <div>
                {options.map((option, index) => (
                    <div
                        className={classes.option}
                        key={index}
                        onClick={() => onSetSorter(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
            <Button
                variant={'borderless'}
                data={'primary'}
                width={'100%'}
                onClick={onClose}
            >
                Cancel
            </Button>
        </Popover>
    )
}

export default SorterModal

SorterModal.propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
    orderOptions: PropTypes.array,
    sortColumnCb: PropTypes.func
}