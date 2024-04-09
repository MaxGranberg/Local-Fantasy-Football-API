/**
 * Swagger configuration.
 *
 * @author Max Granberg
 * @version 1.0.0
 */

import { fileURLToPath } from 'url'
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Local Fantasy Football League API',
      version: '1.0.0',
      description: 'This is a REST API for a Local Fantasy Football League.'
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:8080/api/v1',
        description: 'API server'
      }
    ]
  },
  // Path to the API docs
  apis: [path.join(__dirname, '../routes/api/v1/*.js'),
    path.join(__dirname, '../routes/api/v1/api-docs/swaggerComponents.js')] // Adjust the path according to project structure
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
