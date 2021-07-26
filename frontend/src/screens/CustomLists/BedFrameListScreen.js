import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listBedFrames,
  deleteBedFrame,
  listBedFrameDetails,
} from '../../actions/customProducts/bedFrameActions'

const BedFrameListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const bedFrameList = useSelector(state => state.bedFrameList)
  const { loading, bedFrames, error } = bedFrameList

  const bedFrameDelete = useSelector(state => state.bedFrameDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = bedFrameDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listBedFrames())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteBedFrame(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custom/bedframe/create'>
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
            bedFrames && (
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
                    {bedFrames.map(bedFrame => (
                      <tr key={bedFrame._id}>
                        <td>{bedFrame._id}</td>
                        <td>{bedFrame.speciesName}</td>
                        <td>{bedFrame.speciesImage}</td>
                        <td>${bedFrame.speciesPrice}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/bedframe/${bedFrame._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listBedFrameDetails(bedFrame._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(bedFrame._id)}
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

export default BedFrameListScreen
