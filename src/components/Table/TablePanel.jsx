import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { FirstPage, LastPage, ChevronRight, ChevronLeft, Add, FilterList, ArrowUpward, SaveAlt, Search, Clear, DeleteOutline } from '@material-ui/icons'
import { Container, Row } from 'react-bootstrap';
import { FilterPeriod } from '../FilterPeriod'

import { PatchedPagination } from '../PatchedPagination'
import { statusList } from '../../util/static'
import { TbButtonRound } from '../index'

export const TablePanel = ({...props}) => {
    const { title, pageSize, pageSizeOptions, icons, totalCount, currentPage, onSelect, header, paging, search, ...restProps } = props;

    return (
        <MaterialTable          
          components={{
            Pagination: PatchedPagination,
            Action: props => (
              <div className='btn-table-svg'>
                <TbButtonRound
                    action={(event) => props.action.onClick(event, props.data)}
                    title={''}
                    sizeRound={25}
                    iconInside={<SvgDocuments size={12}/>}
                />
              </div>
            ),
            Toolbar: propsToolbar => (
              <Container>
                <Row>
                  <MTableToolbar {...propsToolbar} />
                </Row>
                {props.filterPeriod? (
                <Row className="mb-1">
                  <FilterPeriod {...props.filterPeriod}/>
                </Row>
                ) : '' }
              </Container>
            ),
          }}
          data={restProps.data}
          title={title}
          page={currentPage}
          options={{
            actionsColumnIndex: -1,
            header: header,
            search: search,
            isLoading: true,
            emptyRowsWhenPaging: false,
            pageSize: restProps.pageSize ? restProps.pageSize : pageSize,
            pageSizeOptions: pageSizeOptions,
            rowStyle: { fontFamily: "Proxima Nova Lt", fontSize: '14px' },
            headerStyle: { position: 'sticky', fontFamily: "Proxima Nova Lt", fontSize: '16px', fontWeight: '600' }, 
            maxBodyHeight: '650px',
            filtering: true
          }}
          actions={ restProps.route === '/selling' || restProps.route === '/buying' ? [
              {
                icon: () => <></>,
                tooltip: 'row',
                onClick: (event, rowData) => onSelect(rowData)
              } 
            ] : []}
          icons={icons}
          //  onChangePage={(page) => restProps.onPageChange(page)}={(page) => restProps.onPageChange(page)}
          localization={{
            toolbar: {
              searchPlaceholder: '??????????'
            },
            header: {
              actions: ''
            },
            body: {
              emptyDataSourceMessage: '?????? ????????????'
            },
            pagination: {
              labelDisplayedRows: '{from}-{to} ???? {count}',
              labelRowsSelect: '??????????',
              labelRowsPerPage: '?????????? ???? ????????????????',
              firstAriaLabel: '???????????? ????????????????',
              firstTooltip: '???????????? ????????????????',
              previousAriaLabel: '???????????????????? ????????????????',
              previousTooltip: '???????????????????? ????????????????',
              nextAriaLabel: '?????????????????? ????????????????',
              nextTooltip: '?????????????????? ????????????????',
              lastAriaLabel: '?????????????????? ????????????????',
              lastTooltip: '?????????????????? ????????????????',
            }
          }}
           // onRowClick={(event, rowData) => onSelect(rowData)}
      columns = {{
        '/selling': [
                { title: '???????? ????????????????', field: 'date', type: 'datetime', searchable: false, showTable: true, showModal: false },
        ],
        '/buying': [
                { title: '???????? ????????????????', field: 'date', type: 'datetime', searchable: false, showTable: true, showModal: false },
        ],
        'wallet': restProps.columns.filter(el => el.showTable === true)
      }[restProps.route]}
        />
      )
}

TablePanel.defaultProps = {
  title: 'DefaultTitle',
  pageSize: 5,
  pageSizeOptions: [5, 10, 20, 50],
  totalCount: 0,
  currentPage: 0,
  header: true,
  search: true,
  icons: {
    'Add': Add,
    'FirstPage': FirstPage,
    'LastPage': LastPage,
    'NextPage': ChevronRight,
    'PreviousPage': ChevronLeft,
    'Filter': FilterList,
    'SortArrow': ArrowUpward,
    'Export': SaveAlt,
    'Search': Search,
    'Clear': Clear,
    'Delete': DeleteOutline,
    'ResetSearch': Clear
  }
}
