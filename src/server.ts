import express from 'express';
import { mongoConnection } from './database/MongooseConnection';
import router from './routes/product-routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(router);


async function startServer() {
  try {
    await mongoConnection();
    console.log("✅ Conexão ao banco de dados estabelecida com sucesso!");
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar servidor", error);
    process.exit(1);
  }
}
startServer();


export default app;