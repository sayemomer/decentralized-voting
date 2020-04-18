import mongoose from 'mongoose';
import app from './config/express';
require('dotenv').load();


const port = process.env.PORT;
const mongoUri = 'mongodb://127.0.0.1:27017/voting';

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}, () => { }).then(() => {
	console.log('mongodb is connected');
});

mongoose.connection.on('error', () => {
	console.log(`unable to connect to database: ${mongoUri}`);
});


app.listen(port, () => {
	console.log('listening on port ' + port);
});

export default app;
