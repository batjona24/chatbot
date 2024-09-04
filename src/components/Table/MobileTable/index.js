import {useCallback, useEffect, useState} from "react"
import {ArrowDownIcon, ArrowUpIcon, CanOrderIcon} from "../../../theme/icons"
import SorterModal from "./SorterModal"
import {Virtuoso} from "react-virtuoso"
import {Link} from "react-router-dom"
import Spinner from "../../Spinner"
import cx from 'classnames'
import Loader from "../DesktopTable/Loader"
import useStyles from "./style"

const MobileTable = ({
    className,
    theadClassName,
    tbodyClassName,
    tfootClassName,
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
    const orderOptions = columns.filter(e => e.sortable).map(e => ({label: e.label, value: e.name}))
    const [showSortModal, setShowSortModal] = useState(false)
    const [currentSortedColumn, setCurrentSortedColumn] = useState({})
    const hasSortableColumns = !!columns.find(column => column.sortable)
    const classes = useStyles({tbodyHeight, alternatingColors})

    useEffect(() => {
        columns.forEach(column => {
            if(column.name === sorter?.order_by) setCurrentSortedColumn(column)
        })
    }, [sorter, columns])

    const setShowSortModalCb = useCallback(() => setShowSortModal(!showSortModal), [showSortModal])

    const renderRow = (item, itemIndex, clickable) => (
        <div
            className={cx(classes.tr, trClassName, clickable ? classes.rowClickable : '')}
            key={itemIndex}
        >
            {columns.map((column, index) => (
                <div
                    className={classes.td}
                    key={index}
                >
                    <div className={classes.tdLabel}>
                        {column.icon}
                        <span>
                            {column.label}
                        </span>
                    </div>
                    <span className={classes.tdValue}>
                        {columnsRenderers[column.name](item[column.name], item, itemIndex)}
                    </span>
                </div>
            ))}
            {(!!columnsRenderers.expandedRow && expandedRowsIndexes.includes(itemIndex)) &&
                <div className={cx(classes.expandedRow, expandedRowClassName)}>
                    {columnsRenderers.expandedRow(null, item, itemIndex)}
                </div>
            }
            {!!columnsRenderers.subRow &&
                <div className={cx(classes.subRow, subRowClassName)}>
                    {columnsRenderers.subRow(null, item, itemIndex)}
                </div>
            }
        </div>
    )

    return (
        <div
            className={className}
            {...rest}
        >
            {showSortModal &&
                <SorterModal
                    onClose={setShowSortModalCb}
                    title="Order by"
                    options={orderOptions}
                    sortColumnCb={sortColumnCb}
                />
            }

            {hasSortableColumns && (
                <div className={cx(classes.thead, theadClassName)}>
                    <h5>
                        Order by:
                    </h5>
                    <span onClick={setShowSortModalCb}>
                        {currentSortedColumn.label || '-'}
                    </span>
                    {!!sorter?.order_by &&
                        <>
                            {sorter?.order_direction === 'asc'
                                ? <ArrowUpIcon onClick={() => sortColumnCb(null, null)}/>
                                : sorter?.order_direction === 'desc'
                                    ? <ArrowDownIcon onClick={() => sortColumnCb(sorter?.order_by, 'asc')}/>
                                    : <CanOrderIcon onClick={() => sortColumnCb(sorter?.order_by, 'desc')}/>
                            }
                        </>
                    }

                </div>
            )}
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
                                    <div style={{
                                        paddingTop: (itemIndex === 0) ? 16 : 0,
                                        paddingBottom: (itemIndex === data.length - 1) ? 16 : 0
                                    }}>
                                        {!!linkPath
                                            ? <Link
                                                to={linkPath}
                                                target={openRowsInBlank ? "_blank" : "_self"}
                                                rel={'noopener noreferrer'}
                                                style={{textDecoration: 'none'}}
                                            >
                                                {renderRow(item, itemIndex, true)}
                                            </Link>
                                            : renderRow(item, itemIndex)
                                        }
                                    </div>
                                )
                            }}
                            components={{
                                Footer: () => (
                                    isLoading
                                        ? <Spinner/>
                                        : <></>
                                )
                            }}
                        />
                        :
                        <div className={cx(classes.tbody, classes.noResults)}>
                            {isLoading
                                ? <Loader
                                    className={cx(classes.tr, trClassName)}
                                    singleLoaderClassName={cx(classes.td, tdClassName)}
                                    columns={columns}
                                />
                                : <span>There are not results.</span>
                            }
                        </div>
                )
                : <div className={cx(classes.tbody, tbodyClassName)}>
                    {data.map((item, itemIndex) => {
                        const linkPath = rowLinkPath(item)

                        return (
                            <div
                                style={{
                                    paddingTop: (itemIndex === 0) ? 16 : 0,
                                    paddingBottom: (itemIndex === data.length - 1) ? 16 : 0
                                }}
                                key={itemIndex}
                            >
                                {!!linkPath
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
                                }
                            </div>
                        )
                    })}
                </div>
            }
            {footer &&
                <div className={tfootClassName}>
                    {footer}
                </div>
            }
        </div>
    )
}

export default MobileTable