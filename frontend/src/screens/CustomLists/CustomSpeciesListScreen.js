import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listCustomSpecies,
  listCustomSpeciesDetails,
  deleteCustomSpecies,
} from '../../actions/customSpeciesActions'

const CustomSpeciesListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const customSpeciesList = useSelector(state => state.customSpeciesList)
  const { loading, customSpecies, error } = customSpeciesList

  const customSpeciesDelete = useSelector(state => state.customSpeciesDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = customSpeciesDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listCustomSpecies())
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteCustomSpecies(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/customspecies/create'>
            <Button>
              <i className='fas fa-plus'></i> Create New
            </Button>
          </Link>
        </Col>
      </Row>
      <Link to='/admin/customproducts' className='btn btn-dark my-3'>
        Go Back
      </Link>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            customSpecies && (
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
                    {customSpecies.map(species => (
                      <tr key={species._id}>
                        <td>{species._id}</td>
                        <td>{species.speciesName}</td>
                        <td>{species.speciesImage}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/customspecies/${species._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listCustomSpeciesDetails(species._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(species._id)}
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

export default CustomSpeciesListScreen
