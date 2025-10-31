import { mongoConnection } from './database/MongooseConnection';
import app from './index';


const PORT = process.env.PORT || 3000;


async function startServer() {
  try {
    await mongoConnection();
    console.log("✅ Conexão ao banco de dados estabelecida com sucesso!");
    app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar servidor", error);
    process.exit(1);
  }
}
startServer();
