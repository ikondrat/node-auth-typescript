import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('asdasd'));

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
