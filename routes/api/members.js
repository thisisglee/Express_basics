const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const members = require('../../Members.js')

//dynamic to get all members
router.get('/',  (req, res) => {
    res.json(members)
})

// to get single member
router.get('/:id',  (req, res) => {
    // res.send(req.params.id)

    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        //filter method to res only asked particluar member id
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg : `No Member found with id of ${req.params.id}`})
    } 
})

// to create member
router.post('/', (req, res) => {
    // res.send(req.body)

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg : 'Please include a name and email'})
    }

    members.push(newMember)
    // commenting for redirect for handlebars
     res.json(members)
    // res.redirect('/')
})

//update member
router.put('/:id',  (req, res) => {
    // res.send(req.params.id)

    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        //filter method to res only asked particluar member id
        const updateMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email

                res.json({ msg: 'Member updated', member})
            }
        })
    } else {
        res.status(400).json({ msg : `No Member found with id of ${req.params.id}`})
    } 
})

//delete member
router.delete('/:id',  (req, res) => {
    // res.send(req.params.id)

    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        //filter method to res only asked particluar member id
        res.json({ msg: 'Member Deleted', members : members.filter(member => member.id !== parseInt(req.params.id))})
    } else {
        res.status(400).json({ msg : `No Member found with id of ${req.params.id}`})
    } 
})





module.exports = router