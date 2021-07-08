import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

import customProducts from './data/customProducts.js'
import customAccents from './data/customAccents.js'
import customBases from './data/customBases.js'
import customPaints from './data/customPaints.js'
import customSpecies from './data/customSpecies.js'
import customStains from './data/customStains.js'

import CustomProduct from './models/customProductModels/customProductModel.js'
import CustomAccent from './models/customProductModels/customAccentModel.js'
import CustomBase from './models/customProductModels/customBaseModel.js'
import CustomPaint from './models/customProductModels/customPaintModel.js'
import CustomSpecies from './models/customProductModels/customSpeciesModel.js'
import CustomStain from './models/customProductModels/customStainModel.js'

import CustomOrder from './models/customProductModels/customOrderModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    await CustomProduct.deleteMany()
    await CustomAccent.deleteMany()
    await CustomBase.deleteMany()
    await CustomPaint.deleteMany()
    await CustomSpecies.deleteMany()
    await CustomStain.deleteMany()
    await CustomOrder.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    const sampleCustomProducts = customProducts.map(customProduct => {
      return { ...customProduct, user: adminUser }
    })

    const sampleCustomAccents = customAccents.map(customAccent => {
      return { ...customAccent, user: adminUser }
    })

    const sampleCustomBases = customBases.map(customBase => {
      return { ...customBase, user: adminUser }
    })

    const sampleCustomPaints = customPaints.map(customPaint => {
      return { ...customPaint, user: adminUser }
    })

    const sampleCustomSpecies = customSpecies.map(customSpec => {
      return { ...customSpec, user: adminUser }
    })

    const sampleCustomStains = customStains.map(customStain => {
      return { ...customStain, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    await CustomProduct.insertMany(sampleCustomProducts)
    await CustomAccent.insertMany(sampleCustomAccents)
    await CustomBase.insertMany(sampleCustomBases)
    await CustomPaint.insertMany(sampleCustomPaints)
    await CustomSpecies.insertMany(sampleCustomSpecies)
    await CustomStain.insertMany(sampleCustomStains)

    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
