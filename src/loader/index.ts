import expressLoader from './express'
import mongooseLoader from './mongoose'
import express from 'express' // 1

export default async (expressApp: express.Application) => {
  const mongoConnection = await mongooseLoader()
  console.log('MongoDB Intialized')
  await expressLoader({ app: expressApp })
  console.log('Express Intialized')

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}
