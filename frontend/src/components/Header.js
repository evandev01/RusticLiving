import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import SearchBox from './SearchBox'
import LogoFb from '../assets/logos/logo_fb.jpg'
import Logo from '../assets/logos/RusticLiving_White_LOGO_9_fav.png'

import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer style={{ color: '#FF671F' }} to='/'>
            <Navbar.Brand>
              {/* Rustic Living */}
              <Image src={Logo} style={{ maxWidth: '80px', height: 'auto' }} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              {/* <LinkContainer to='/cart'>
                <Nav.Link id='nav-link'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer> */}
              {/* <LinkContainer to='/custom'>
                <Nav.Link id='nav-link'>
                  <i className='fas fa-wrench'></i> Build Your Own
                </Nav.Link>
              </LinkContainer> */}

              <LinkContainer to='/gallery'>
                <Nav.Link id='nav-link'>
                  <i className='fas fa-images'></i> Gallery
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/ourstory'>
                <Nav.Link id='nav-link'>
                  <i className='fas fa-book-open'></i> Our Story
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link id='nav-link'>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/gallery'>
                    <NavDropdown.Item>Gallery</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/custom/products'>
                    <NavDropdown.Item>Custom</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
