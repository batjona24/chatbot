import React, {useState} from 'react'
import Divider from "../../../components/Divider";
import {ArrowDownIcon, ArrowUpIcon, MembersIcon} from "../../../theme/icons"
import TableComponent from '../../../components/Table'
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles((theme) => ({
    expand: {
        width: '100%',
        textAlign: 'center',
        ...theme.clickable,
    },
    expandedRow: {
        background: theme.palette.grey[200],
        padding: theme.spacing * 3,
        marginBottom: theme.spacing,
        borderRadius: theme.spacing,
        fontSize: 12
    }
}))

const Table = () => {
    const classes = useStyles()

    const [sorter, setSorter] = useState({order_by: null, order_direction: null})
    const [desktopExpandedIndexes, setDesktopExpandedIndexes] = useState([])
    const [mobileExpandedIndexes, setMobileExpandedIndexes] = useState([])
    const columns = [
        {name: 'id', label: 'ID', icon: <MembersIcon/>, sortable: true, width: '10%'},
        {name: 'name', label: 'Name', icon: <MembersIcon/>, sortable: true, width: '40%'},
        {name: 'city', label: 'City', icon: <MembersIcon/>, sortable: true, width: '40%'},
        {name: 'expand', width: '10%', alignment: 'right'},
    ]
    const data = [
        {id: 1, name: 'John', location: {country: 'US', city: 'New York'}},
        {id: 2, name: 'Paul', location: {country: 'ES', city: 'Madrid'}},
        {id: 3, name: 'Jordan', location: {country: 'FR', city: 'Paris'}},
        {id: 4, name: 'Jack', location: {country: 'IT', city: 'Rome'}},
    ]

    return <>
        <div className="row">
            <div className="col-11 mt-4">
                <h5>Table</h5>
                <Divider/>
                <p>
                    desc
                </p>
            </div>
        </div>

        <div className="row mt-5 mb-5">
            <div className="col-12">
                <TableComponent
                    showMobileTable={false}
                    data={data}
                    columns={columns}
                    sorter={sorter}
                    sortColumnCb={() => {}}
                    expandedRowsIndexes={desktopExpandedIndexes}
                    expandedRowClassName={classes.expandedRow}
                    searchPlaceholder="Search"
                    columnsRenderers={{
                        id: (value) => <span>{value}</span>,
                        name: (value) => <span>{value}</span>,
                        city: (value, item) => <span>{`${item?.location?.city} (${item?.location?.country})`}</span>,
                        expand: (value, item, index) => <div className={classes.expand} onClick={() => {
                                desktopExpandedIndexes.includes(index)
                                    ? setDesktopExpandedIndexes(desktopExpandedIndexes.filter(e => e !== index))
                                    : setDesktopExpandedIndexes([...desktopExpandedIndexes, index])
                            }}>
                                {
                                    desktopExpandedIndexes.includes(index)
                                        ? <ArrowUpIcon width={16} fill="#888"/>
                                        : <ArrowDownIcon width={16} fill="#888"/>
                                }
                            </div>,
                        expandedRow: (value, item, index) => <div>
                                Expanded Row index {index}
                            </div>,
                    }}
                />
            </div>
        </div>
        <div className="row mt-5 mb-5">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 col-xxl-4">
                <TableComponent
                    showMobileTable
                    data={data}
                    columns={columns}
                    sorter={sorter}
                    sortColumnCb={() => {}}
                    searchPlaceholder="Search"
                    expandedRowsIndexes={mobileExpandedIndexes}
                    expandedRowClassName={classes.expandedRow}
                    columnsRenderers={{
                        id: (value) => <span>{value}</span>,
                        name: (value) => <span>{value}</span>,
                        city: (value, item) => <span>{`${item?.location?.city} (${item?.location?.country})`}</span>,
                        expand: () => <></>,
                        subRow: (value, item, index) => <div className={classes.expand} onClick={() => {
                                mobileExpandedIndexes.includes(index)
                                    ? setMobileExpandedIndexes(mobileExpandedIndexes.filter(e => e !== index))
                                    : setMobileExpandedIndexes([...mobileExpandedIndexes, index])
                            }}>
                                {
                                    mobileExpandedIndexes.includes(index)
                                        ? <ArrowUpIcon width={16} fill="#888"/>
                                        : <ArrowDownIcon width={16} fill="#888"/>
                                }

                            </div>,
                        expandedRow: (value, item, index) => <div>
                            Expanded Row index {index}
                        </div>,
                    }}
                />
            </div>
        </div>
    </>
}

export default Table
