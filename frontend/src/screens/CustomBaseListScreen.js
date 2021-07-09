import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCustomBases } from '../actions/customBaseActions'

const CustomBaseListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const customBaseList = useSelector(state => state.customBaseList)
  const { loading, customBases, error } = customBaseList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listCustomBases())
    }
  }, [dispatch, history])

  return (
    <>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer
            className='btn btn-dark btn-lg my-3'
            to='/admin/customproducts'
          >
            <h1>Custom Products</h1>
          </LinkContainer>
        </Col>
      </Row>
      <Row className='align-items-center'>
        <Col className='text-center'>
          <LinkContainer to='/admin/customproductlist'>
            <Button variant='outline-success' size='md'>
              Products
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customspecieslist'>
            <Button variant='outline-success' size='md' block>
              Species
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custombaselist'>
            <Button variant='outline-success' size='md' block>
              Bases
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/custompaintlist'>
            <Button variant='outline-success' size='md' block>
              Paints
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customstainlist'>
            <Button variant='outline-success' size='md' block>
              Stains
            </Button>
          </LinkContainer>
          <LinkContainer to='/admin/customaccentlist'>
            <Button variant='outline-success' size='md' block>
              Accents
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            customBases && (
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
                      <th>NAME</th>
                      <th>IMAGE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customBases.map(base => (
                      <tr key={base._id}>
                        <td>{base._id}</td>
                        <td>{base.baseName}</td>
                        <td>{base.baseImage}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custombase/${base._id}/edit`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          // onClick={() => deleteHandler(product._id)}
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

export default CustomBaseListScreen
