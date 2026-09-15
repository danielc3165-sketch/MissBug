
import express from 'express'

import { bugService } from './services/bug-service.js'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cookieParser())
app.use(express.json())
app.set('query parser', 'extended')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/api/bug', (req, res) => {

      

     var filterBy = { 
        txt: req.query.filterBy.txt || '' ,
        minSeverity: +req.query.filterBy.minSeverity || 0,
    }

    var pageIdx = +req.query.pageIdx || 0
    console.log('pageIdx', pageIdx)
    bugService.query(filterBy, pageIdx)
        .then(bugs => {
            res.send(bugs)
            //console.log('bugs', bugs)
        })
        .catch(() => res.status(400).send('Cannot get bugs'))
})


app.put('/api/bug/:id', (req, res) => {
   
    const bug={
        _id: req.body.id,
        title: req.body.title,
        severity: req.body.severity,
        description: req.body.description,
    }

    console.log('bug', bug)

    bugService.save(bug)
    .then(savedBug => {
        console.log('bug', savedBug)
        res.send(savedBug)
    })
    .catch(() => res.status(400).send('Cannot save bug'))
}) 


app.post('/api/bug/', (req, res) => {
   
    const bug={
        title: req.body.title,
        severity: req.body.severity,
        description: req.body.description,
    }

    console.log('bug', bug)

    bugService.save(bug)
    .then(savedBug => {
        console.log('bug', savedBug)
        res.send(savedBug)
    })
    .catch(() => res.status(400).send('Cannot save bug'))
}) 





app.get('/api/bug/:id', (req, res) => {
    
    const bugId = req.params.id
    //
    console.log('bugId', bugId)
   
   const visitedIds = req.cookies.visitedIds || []

   if (!visitedIds.includes(bugId)){ 
       if (visitedIds.length >= 3) return res.status(403).send('Access forbidden') 
        else {
             visitedIds.push(bugId)
             console.log(visitedIds)
    
             res.cookie('visitedIds', visitedIds)
        }
    }

    bugService.get(bugId)
        .then(bug => {
           //console.log('bug', bug)
           res.send(bug)
        })
        .catch(() => res.status(400).send('Cannot get bug'))
    
}) 


app.delete('/api/bug/:bugId', (req, res) => {

    const { bugId:_id } = req.params
    console.log('bugId', _id)
    bugService.remove(_id)
    .then(() => {
        res.send('Bug removed')
    })
    .catch(() => res.status(400).send('Cannot get bug'))
})


app.listen(3034, () => {
console.log('Server ready at port 3034')
})