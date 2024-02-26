import * from '../controller/auth';
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/app',express.static(__dirname+'public/'))

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mathrix',
  port: 5432,
});


app.get('/api/events', async (req, res) => {
    try {
      const allEvents = await pool.query('SELECT * FROM event');
      const eventsData = {
        events: allEvents.rows
      };
      res.json(eventsData);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  });

 app.post('/api/events/:id/register' , async (req, res) => {
    try {
      console.log(req.body);
      const  username  = auth.username; 
  
      const  eventName  = req.body.event;
  
      const eventQuery = await pool.query('SELECT id FROM event WHERE title = $1', [eventName]);
      const event = eventQuery.rows[0]; 
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      
  
      await pool.query('INSERT INTO eventuser (userId, eventId) VALUES ($1, $2) RETURNING *', [parseInt(username), event.id]);
  
      res.status(201).json({ message: 'Registration successful' });
      
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


