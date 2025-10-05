import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


export async function mongoConnection(){
    const MONGODB_URI = process.env.MONGODB_URI;

    if(!MONGODB_URI){
        throw new Error('Não foi possível se conectar ao MongoDB')
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('Conexão ao MongoDB estabelecida com sucesso!');
    } catch (e) {
        console.error('Erro ao conectar ao banco de dados', e)
        process.exit(1);
    }
}
