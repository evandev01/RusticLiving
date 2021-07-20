import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
// USER CART / ORDER SCREENS
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
//ADMIN CUSTOM SCREENS
import CustomProductScreen from './screens/CustomProductScreen'
import OrderListScreen from './screens/OrderListScreen'
import CustomProductListScreen from './screens/CustomLists/CustomProductListScreen'
import CustomSpeciesListScreen from './screens/CustomLists/CustomSpeciesListScreen'
import CustomBaseListScreen from './screens/CustomLists/CustomBaseListScreen'
import CustomPaintListScreen from './screens/CustomLists/CustomPaintListScreen'
import CustomStainListScreen from './screens/CustomLists/CustomStainListScreen'
import CustomAccentListScreen from './screens/CustomLists/CustomAccentListScreen'
//ADMIN CUSTOM CREATE SCREENS
import CustomProductCreateScreen from './screens/CustomCreate/CustomProductCreateScreen'
import CustomAccentCreateScreen from './screens/CustomCreate/CustomAccentCreateScreen'
import CustomBaseCreateScreen from './screens/CustomCreate/CustomBaseCreateScreen'
import CustomPaintCreateScreen from './screens/CustomCreate/CustomPaintCreateScreen'
import CustomSpeciesCreateScreen from './screens/CustomCreate/CustomSpeciesCreateScreen'
import CustomStainCreateScreen from './screens/CustomCreate/CustomStainCreateScreen'
//ADMIN CUSTOM EDIT SCREENS
import CustomProductEditScreen from './screens/CustomEdit/CustomProductEditScreen'
import CustomAccentEditScreen from './screens/CustomEdit/CustomAccentEditScreen'
import CustomBaseEditScreen from './screens/CustomEdit/CustomBaseEditScreen'
import CustomPaintEditScreen from './screens/CustomEdit/CustomPaintEditScreen'
import CustomSpeciesEditScreen from './screens/CustomEdit/CustomSpeciesEditScreen'
import CustomStainEditScreen from './screens/CustomEdit/CustomStainEditScreen'

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route
              path='/admin/productlist'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            {/* CUSTOM PRODUCTS */}
            <Route
              path='/admin/customproducts'
              component={CustomProductScreen}
            />
            {/* CUSTOM PRODUCT LISTS */}
            <Route
              path='/admin/customproductlist'
              component={CustomProductListScreen}
            />
            <Route
              path='/admin/customspecieslist'
              component={CustomSpeciesListScreen}
            />
            <Route
              path='/admin/custombaselist'
              component={CustomBaseListScreen}
            />
            <Route
              path='/admin/custompaintlist'
              component={CustomPaintListScreen}
            />

            <Route
              path='/admin/customstainlist'
              component={CustomStainListScreen}
            />
            <Route
              path='/admin/customaccentlist'
              component={CustomAccentListScreen}
            />

            {/* CUSTOM PRODUCT CREATE */}
            <Route
              path='/admin/customproducts/create'
              component={CustomProductCreateScreen}
            />
            <Route
              path='/admin/customaccents/create'
              component={CustomAccentCreateScreen}
            />
            <Route
              path='/admin/custombases/create'
              component={CustomBaseCreateScreen}
            />
            <Route
              path='/admin/custompaints/create'
              component={CustomPaintCreateScreen}
            />
            <Route
              path='/admin/customspecies/create'
              component={CustomSpeciesCreateScreen}
            />
            <Route
              path='/admin/customstains/create'
              component={CustomStainCreateScreen}
            />

            {/* CUSTOM PRODUCT EDIT */}
            <Route
              path='/admin/customproducts/:id/edit'
              component={CustomProductEditScreen}
            />
            <Route
              path='/admin/customaccents/:id/edit'
              component={CustomAccentEditScreen}
            />
            <Route
              path='/admin/custombases/:id/edit'
              component={CustomBaseEditScreen}
            />
            <Route
              path='/admin/custompaints/:id/edit'
              component={CustomPaintEditScreen}
            />
            <Route
              path='/admin/customspecies/:id/edit'
              component={CustomSpeciesEditScreen}
            />
            <Route
              path='/admin/customstains/:id/edit'
              component={CustomStainEditScreen}
            />

            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </>
    </Router>
  )
}

export default App
