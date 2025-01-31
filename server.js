const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    // console.log(err);
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down');
    console.log(err);
    console.log(err.name, err.message);

    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// Atlas Database
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
    console.log('Database connection successful');
});

// Local Database
// mongoose
//     .connect(process.env.DATABASE_LOCAL)
//     .then((connection) => {
//         // console.log(connection.connections);
//         console.log('DB connection successful');
//     })
//     .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
