import MobileTable from "./MobileTable/index"
import DesktopTable from "./DesktopTable/index"
import PropTypes from "prop-types"
import {useWindowSize} from "../../hooks/useWindowSize"
import useStyles from "./style"
import Input from "../Input"
import {SearchIcon} from "../../theme/icons"
import {useTheme} from "react-jss"
import cx from "classnames"
import {breakpoints} from "../../theme/responsive"

const Table = ({
    showMobileTable,
    hasSearch = true,
    searchPlaceholder,
    searchDefaultValue,
    searchErrors,
    searchRest,
    searchClassName,
    ...rest
}) => {
    const theme = useTheme()
    const isMobile = useWindowSize().width < breakpoints.width.m
    const renderMobileTable = showMobileTable ?? isMobile
    const classes = useStyles({renderMobileTable})

    return (
        <div className={classes.root}>
            {hasSearch && (
                <div className={classes.inputWrapper}>
                    <Input
                        placeholder={searchPlaceholder}
                        errors={searchErrors}
                        icon={<SearchIcon fill={theme.palette.grey[400]}/>}
                        iconPosition="right"
                        rootClassName={cx(classes.searchInput,searchClassName)}
                        inputProps={{defaultValue: searchDefaultValue}}
                        {...searchRest}
                    />
                </div>
            )}
            {renderMobileTable
                ? <MobileTable {...rest}/>
                : <DesktopTable {...rest}/>
            }
        </div>
    )
}

export default Table

Table.propTypes = {
    showMobileTable: PropTypes.bool,
    className: PropTypes.any,
    theadClassName: PropTypes.any,
    tbodyClassName: PropTypes.any,
    tfootClassName: PropTypes.any,
    thClassName: PropTypes.any,
    trClassName: PropTypes.any,
    tdClassName: PropTypes.any,
    expandedRowClassName: PropTypes.any,
    subRowClassName: PropTypes.any,
    tbodyHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //required with pagination
    alternatingColors: PropTypes.bool,
    columns: PropTypes.array.isRequired, //{name: 'col_name', label: 'Column', icon: <Icon/>, sortable: true, width: '20%'}
    data: PropTypes.array.isRequired,
    isPaginated: PropTypes.bool,
    page: PropTypes.number, //required with pagination
    changePageCb: PropTypes.func, //required with pagination
    sortColumnCb: PropTypes.func, //required with sortable columns
    sorter: PropTypes.object, //required with sortable columns
    isLoading: PropTypes.bool, //required with pagination
    rowLinkPath: PropTypes.func,
    openRowsInBlank: PropTypes.bool,
    expandedRowsIndexes: PropTypes.array, //required with expendable rows
    footer: PropTypes.element,
    hasSearch: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    searchDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    searchErrors: PropTypes.object,
    searchRest: PropTypes.object,
    searchClassName: PropTypes.any,
    columnsRenderers: PropTypes.object.isRequired, //col_name: (value, item, rowIndex) => <span>{value}</span>,
}