const { response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const getUsers = async (req, res = response) => {
    const { page=1, page_size=10 } = req.query
    const estado = { status: true }
    
    const [ total, users] = await Promise.all([
        User.count( estado ),
        User.find( estado )
            .limit( Number( page_size ) )
            .skip( Number( page_size ) * ( Number( page ) - 1) )
    ])

    res.json({ total, users })
}

const getUser = async (req, res = response) => {
    const { id } = req.params
    const user = await User.findById(id)

    res.json(user)
}

const postUser = async (req, res = response) => {

    const { name, email, password, rol, status, google } = req.body
    const encryptPass = await bcrypt.hash( password, 10 )
    const user = new User({ name, email, password: encryptPass, rol, status, google})


    try {   
        await user.save()
    } catch (err) {
        throw err
    }
    
    res.json(user)
}

const putUser = async (req, res = response) => {
    const { id } = req.params   
    const { _id, password, google, ...resto} = req.body
    const encryptPass = await bcrypt.hash( password, 10 )
    resto.password = encryptPass

    const user = await User.findByIdAndUpdate(id, resto)

    res.json(user)
}

const patchUser = (req, res = response) => {
    res.json({ msg: 'user patched' })

}

const deleteUser = async (req, res = response) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { status: false })
    
    res.json({ msg: 'user deleted', user })

}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}