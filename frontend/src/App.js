import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import OurStoryScreen from './screens/OurStoryScreen'
import ContactScreen from './screens/ContactScreen'
import GalleryScreen from './screens/GalleryScreen'
import GalleryImageScreen from './screens/GalleryImageScreen'
// import CustomBuildScreen from './screens/CustomBuildScreen'
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
// ADMIN CUSTOM LIST SCREENS
import CustomProductScreen from './screens/CustomProductScreen'
import OrderListScreen from './screens/OrderListScreen'
import TableListScreen from './screens/CustomLists/TableListScreen'
import BedFrameListScreen from './screens/CustomLists/BedFrameListScreen'
import DoorListScreen from './screens/CustomLists/DoorListScreen'
import AccentListScreen from './screens/CustomLists/AccentListScreen'
import BaseListScreen from './screens/CustomLists/BaseListScreen'
import StainListScreen from './screens/CustomLists/StainListScreen'
import PaintListScreen from './screens/CustomLists/PaintListScreen'
import EstCompListScreen from './screens/CustomLists/EstCompListScreen'
// ADMIN CUSTOM CREATE SCREENS
import TableCreateScreen from './screens/CustomCreate/TableCreateScreen'
import BedFrameCreateScreen from './screens/CustomCreate/BedFrameCreateScreen'
import DoorCreateScreen from './screens/CustomCreate/DoorCreateScreen'
import AccentCreateScreen from './screens/CustomCreate/AccentCreateScreen'
import BaseCreateScreen from './screens/CustomCreate/BaseCreateScreen'
import PaintCreateScreen from './screens/CustomCreate/PaintCreateScreen'
import StainCreateScreen from './screens/CustomCreate/StainCreateScreen'
// import EstCompCreateScreen from './screens/CustomCreate/EstCompCreateScreen'
//ADMIN CUSTOM EDIT SCREENS
import TableEditScreen from './screens/CustomEdit/TableEditScreen'
import BedFrameEditScreen from './screens/CustomEdit/BedFrameEditScreen'
import DoorEditScreen from './screens/CustomEdit/DoorEditScreen'
import AccentEditScreen from './screens/CustomEdit/AccentEditScreen'
import BaseEditScreen from './screens/CustomEdit/BaseEditScreen'
import PaintEditScreen from './screens/CustomEdit/PaintEditScreen'
import StainEditScreen from './screens/CustomEdit/StainEditScreen'
import EstCompEditScreen from './screens/CustomEdit/EstCompEditScreen'
// USER CUSTOMIZE SCREENS
import CustomizeTableScreen from './screens/CustomizeScreens/CustomizeTableScreen'
import GalleryPhotoListScreen from './screens/Gallery/GalleryPhotoListScreen'
import GalleryPhotoCreateScreen from './screens/Gallery/GalleryPhotoCreateScreen'
import GalleryPhotoEditScreen from './screens/Gallery/GalleryPhotoEditScreen'

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
            {/* <Route path='/custom' component={CustomBuildScreen} /> */}
            <Route path='/customize/table' component={CustomizeTableScreen} />
            {/* <Route path='/customize/bedframe' component={CustomizeBedFrameScreen} /> */}
            {/* <Route path='/customize/door' component={CustomizeDoorScreen} /> */}
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/ourstory' component={OurStoryScreen} />
            <Route path='/contact' component={ContactScreen} />
            <Route path='/gallery' component={GalleryScreen} />
            <Route path='/galleryimages' component={GalleryImageScreen} />
            <Route path='/admin/gallery' component={GalleryPhotoListScreen} />
            <Route
              path='/admin/galleryphoto/create'
              component={GalleryPhotoCreateScreen}
            />
            <Route
              path='/admin/galleryphoto/:id/edit'
              component={GalleryPhotoEditScreen}
            />

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
            <Route path='/admin/product' component={ProductEditScreen} exact />
            <Route path='/admin/product/:id' component={ProductEditScreen} />
            {/* CUSTOM PRODUCTS */}
            <Route
              path='/admin/custom/products'
              component={CustomProductScreen}
              exact
            />

            {/* CUSTOM PRODUCT LISTS */}
            <Route path='/admin/custom/tables' component={TableListScreen} />
            <Route
              path='/admin/custom/bedframes'
              component={BedFrameListScreen}
            />
            <Route path='/admin/custom/doors' component={DoorListScreen} />
            <Route path='/admin/custom/accents' component={AccentListScreen} />
            <Route path='/admin/custom/bases' component={BaseListScreen} />
            <Route path='/admin/custom/paints' component={PaintListScreen} />
            <Route path='/admin/custom/stains' component={StainListScreen} />
            <Route
              path='/admin/custom/estcompdates'
              component={EstCompListScreen}
            />

            {/* CUSTOM PRODUCT CREATE */}
            <Route
              path='/admin/custom/table/create'
              component={TableCreateScreen}
            />
            <Route
              path='/admin/custom/bedframe/create'
              component={BedFrameCreateScreen}
            />
            <Route
              path='/admin/custom/door/create'
              component={DoorCreateScreen}
            />
            <Route
              path='/admin/custom/accent/create'
              component={AccentCreateScreen}
            />
            <Route
              path='/admin/custom/base/create'
              component={BaseCreateScreen}
            />
            <Route
              path='/admin/custom/paint/create'
              component={PaintCreateScreen}
            />
            <Route
              path='/admin/custom/stain/create'
              component={StainCreateScreen}
            />

            {/* CUSTOM PRODUCT EDIT */}
            <Route
              path='/admin/custom/table/:id/edit'
              component={TableEditScreen}
            />
            <Route
              path='/admin/custom/bedframe/:id/edit'
              component={BedFrameEditScreen}
            />
            <Route
              path='/admin/custom/door/:id/edit'
              component={DoorEditScreen}
            />
            <Route
              path='/admin/custom/accent/:id/edit'
              component={AccentEditScreen}
            />
            <Route
              path='/admin/custom/base/:id/edit'
              component={BaseEditScreen}
            />
            <Route
              path='/admin/custom/paint/:id/edit'
              component={PaintEditScreen}
            />
            <Route
              path='/admin/custom/stain/:id/edit'
              component={StainEditScreen}
            />
            <Route
              path='/admin/custom/estcompdate/:id/edit'
              component={EstCompEditScreen}
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
