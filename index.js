import express from "express";
import * as yup from "yup";
import {v4 as uuidv4} from 'uuid';

const app = express();
app.use(express.json());

let usersList = [];

const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    cpf: yup.string().min(11).max(11).required()
}); 

const createNotesSchema = yup.object().shape({
    title: yup.string(),
    content: yup.string()
}); 

const validate = (schema) => async (req, res, next) => {
    const resource = req.body;
    try {
      await schema.validate(resource);
      next();
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: e.errors.join(', ') });
    };
};

// Middleware
const verifyCpf = (req, res, next) => {
    const { cpf } = req.params;
    const foundedCpf = usersList.find(user => user.cpf === cpf);
    
    if (!foundedCpf) {
        return res.status(404).json({ error: "invalid cpf - user is not registered" });
    }  
    next();
} 


app.get('/users', (req, res) => {
    res.json(usersList);
});


app.post('/users', validate(createUserSchema), (req, res) => {
    const { name, cpf } = req.body;

    const foundedCpf = usersList.find(user => user.cpf === cpf);
    
    if (foundedCpf) {
        return res.status(404).json({ message: 'user already exists!' });
    }   

    const user = { name: name, cpf: cpf, id: uuidv4(), notes: [] };

    usersList.push(user);  
    
    res.status(201).json(user);
    
});


app.patch('/users/:cpf', verifyCpf, (req, res) => {
    const { cpf } = req.params;
    let body = req.body;

    const userFounded = usersList.find(user => user.cpf === cpf);  

    if(body.name){
        userFounded.name = body.name
    }

    if(body.cpf){
        userFounded.cpf = body.cpf
    }
    res.json({message: "User is updated", "users": userFounded});
});


app.delete('/users/:cpf', verifyCpf, (req, res) => {
    const { cpf } = req.params;

    const userFounded = usersList.find(user => user.cpf === cpf);

    const newList = usersList.filter((us) => us.cpf !== cpf)

    usersList = newList

    res.json({"message": "User is deleted", "users": newList});
});


// notes
app.post('/users/:cpf/notes', verifyCpf, validate(createNotesSchema), (req, res) => {
    const { title, content } = req.body;
    const { cpf } = req.params;

    const foundedCpf = usersList.find(user => user.cpf === cpf);
    
    const userNotes = {title: title, content: content, id: uuidv4(), created_at: new Date() };

    foundedCpf.notes.push(userNotes)
    
    res.status(201).json({ message: `${title} was added into ${foundedCpf.name}'s notes` });    
});


app.get('/users/:cpf/notes', verifyCpf, (req, res) => {
    const { cpf } = req.params;

    const userFounded = usersList.find(user => user.cpf === cpf);    

    res.json(userFounded.notes);
});


app.patch('/users/:cpf/notes/:id', verifyCpf, (req, res) => {
    const { cpf, id } = req.params;
    let body = req.body;

    const userFounded = usersList.find(user => user.cpf === cpf)
    const getNoteId = userFounded.notes.find(note => note.id === id)
    
    if(userFounded && getNoteId){

        if(body.title){
            getNoteId.title = body.title
        }

        if(body.content){
            getNoteId.content = body.content
        }

        getNoteId.updated_at = new Date()
    }    
    res.json([getNoteId]);
});

app.delete('/users/:cpf/notes/:id', verifyCpf, (req, res) => {
    const { cpf, id } = req.params;

    const userFounded = usersList.find(user => user.cpf === cpf)
    let getNoteId = userFounded.notes.find(note => note.id === id)

    if(userFounded && getNoteId){
        userFounded.notes.pop(getNoteId)  
        getNoteId = []      
    }       
    res.json(getNoteId);
});


app.listen(3000);