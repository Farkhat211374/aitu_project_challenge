const jsonwebtoken = require('jsonwebtoken')
const Employee = require('../models/employees.model') 

// Need to change in Future 

const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization']
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1]
    try {
      const tokenDecoded = jsonwebtoken.verify(
        bearer,
        process.env.TOKEN_SECRET_KEY
      )
      return tokenDecoded
    } catch {
      return false
    }
  } else {
    return false
  }
}

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req)
  if (tokenDecoded) {
    const employee = await Employee.findById(tokenDecoded.id)
    if (!employee) return res.status(401).json('Unathorized')
    req.employee = employee
    next()
  } else {
    res.status(401).json('Unathorized')
  }
}