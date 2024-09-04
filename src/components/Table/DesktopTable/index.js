import cx from 'classnames'
import {ArrowDownIcon, ArrowUpIcon, CanOrderIcon} from "../../../theme/icons"
import {Virtuoso} from "react-virtuoso"
import {Link} from "react-router-dom"
import Loader from "./Loader"
import useStyles from "./style"

const DesktopTable = ({
    className,
    theadClassName,
    tbodyClassName,
    tfootClassName,
    thClassName,
    trClassName,
    tdClassName,
    expandedRowClassName,
    subRowClassName,
    tbodyHeight = 'auto',
    alternatingColors = false,
    columns = [],
    data = [],
    isPaginated,
    changePageCb,
    page,
    sortColumnCb,
    sorter,
    isLoading,
    columnsRenderers,
    rowLinkPath = () => null,
    openRowsInBlank = true,
    expandedRowsIndexes = [],
    footer,
    ...rest
}) => {
    const classes = useStyles({tbodyHeight, alternatingColors})

    const renderRow = (item, itemIndex, clickable) => (
        <div
            className={cx(
                classes.tr,
                trClassName,
                clickable
                    ? classes.rowClickable
                    : null
            )}
            key={itemIndex}
        >
            {columns.map((column, index) => (
                <div
                    className={cx(
                        classes.td,
                        classes[column.alignment],
                        tdClassName
                    )}
                    style={{width: column.width}}
                    key={index}
                >
                    <span>
                        {columnsRenderers[column.name](
                            item[column.name],
                            item,
                            itemIndex
                        )}
                    </span>
                </div>
            ))}
            {(!!columnsRenderers.expandedRow && expandedRowsIndexes.includes(itemIndex)) && (
                <div className={cx(classes.expandedRow, expandedRowClassName)}>
                    {columnsRenderers.expandedRow(null, item, itemIndex)}
                </div>
            )}
            {!!columnsRenderers.subRow && (
                <div className={cx(classes.subRow, subRowClassName)}>
                    {columnsRenderers.subRow(null, item, itemIndex)}
                </div>
            )}
        </div>
    )

    return (
        <div
            className={cx(
                classes.table,
                className
            )}
            {...rest}
        >
            <div className={cx(classes.thead, theadClassName)}>
                {columns.map((column, index) => {
                    const sorterDirection = (
                        sorter?.order_by === column.name
                            ? sorter?.order_direction
                            : null
                    )

                    return (
                        <div
                            className={cx(
                                classes.th,
                                classes[column.alignment],
                                thClassName
                            )}
                            style={{width: column.width}}
                            key={index}
                        >
                            {column.icon && (
                                <div>
                                    {column.icon}
                                </div>
                            )}
                            <span title={column.label}>
                                {column.label}
                            </span>
                            {column.sortable && (
                                <div className={classes.sorter}>
                                    {sorterDirection === "asc"
                                        ? <ArrowUpIcon onClick={() => sortColumnCb(null, null)}/>
                                        : sorterDirection === "desc"
                                            ? <ArrowDownIcon onClick={() => sortColumnCb(column.name, "asc")}/>
                                            : <CanOrderIcon onClick={() => sortColumnCb(column.name, "desc")}/>
                                    }
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            {isPaginated
                ? (!!data.length && !(isLoading && page === 1)
                        ? <Virtuoso
                            className={cx(classes.tbody, tbodyClassName)}
                            data={data}
                            endReached={changePageCb}
                            overscan={100}
                            itemContent={itemIndex => {
                                const item = data[itemIndex]
                                const linkPath = rowLinkPath(item)

                                return (
                                    !!linkPath
                                        ? <Link
                                            to={linkPath}
                                            target={openRowsInBlank ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                            style={{textDecoration: 'none'}}
                                        >
                                            {renderRow(item, itemIndex, true)}
                                        </Link>
                                        : renderRow(item, itemIndex)
                                )
                            }}
                            components={{
                                Footer: () => (
                                    isLoading
                                        ? <Loader
                                            className={cx(classes.tr, trClassName)}
                                            singleLoaderClassName={cx(classes.td, tdClassName)}
                                            columns={columns}
                                        />
                                        : <></>
                                )
                            }}
                        />
                        : <div className={cx(classes.tbody, classes.noResults)}>
                            {isLoading
                                ? <Loader
                                    className={cx(classes.tr, trClassName)}
                                    singleLoaderClassName={cx(classes.td, tdClassName)}
                                    columns={columns}
                                />
                                : <span>
                                    There are not results.
                                </span>}
                        </div>
                )
                : <div className={cx(classes.tbody, tbodyClassName)}>
                    {data.map((item, itemIndex) => {
                        const linkPath = rowLinkPath(item)

                        return (
                            !!linkPath
                                ? <Link
                                    to={linkPath}
                                    target={openRowsInBlank ? "_blank" : "_self"}
                                    rel={'noopener noreferrer'}
                                    style={{textDecoration: 'none'}}
                                    key={itemIndex}
                                >
                                    {renderRow(item, itemIndex, true)}
                                </Link>
                                : renderRow(item, itemIndex)
                        )
                    })}
                </div>
            }
            {footer && (
                <div className={cx(classes.tfoot, tfootClassName)}>
                    {footer}
                </div>
            )}
        </div>
    )
}

export default DesktopTable