import express from 'express';
import cors from 'cors';       
// import router from './routes/store-routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
// app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
