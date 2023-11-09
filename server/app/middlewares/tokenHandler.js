const { DATEONLY } = require("sequelize");
const jsonwebtoken = require('jsonwebtoken')
const db = require("../database/db");
const Employee = db.employees;
const Op = db.Sequelize.Op;
// Need to change in Future 

const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization']
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1]
    try {
      const tokenDecoded = jsonwebtoken.verify(
        bearer,
        process.env.API_SECRET
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
    const employee = await Employee.findByPk(tokenDecoded.id)
    if (!employee) return res.status(401).json('Unathorized')
    req.employee = employee
    next()
  } else {
    res.status(401).json('Unathorized')
  }
}