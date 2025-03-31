import express from 'express';
import router from './routes/index';
import { setupSwagger } from './swagger';

const app = express();

setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from Bun!');
});

app.use('/api', router);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

export default app;
