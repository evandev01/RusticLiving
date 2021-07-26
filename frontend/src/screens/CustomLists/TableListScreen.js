import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listTables,
  deleteTable,
  listTableDetails,
} from '../../actions/customProducts/tableActions'

const TableListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const tableList = useSelector(state => state.tableList)
  const { loading, tables, error } = tableList

  const tableDelete = useSelector(state => state.tableDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = tableDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listTables())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteTable(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custom/table/create'>
            <Button>
              <i className='fas fa-plus'></i> Create New
            </Button>
          </Link>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            tables && (
              <>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className='table-sm mt-4'
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>SPECIES</th>
                      <th>IMAGE</th>
                      <th>PRICE/SQFT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tables.map(table => (
                      <tr key={table._id}>
                        <td>{table._id}</td>
                        <td>{table.speciesName}</td>
                        <td>{table.speciesImage}</td>
                        <td>${table.speciesPrice}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/table/${table._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listTableDetails(table._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(table._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )
          )}
        </Col>
      </Row>
    </>
  )
}

export default TableListScreen
