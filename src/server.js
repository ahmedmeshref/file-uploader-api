const app = require('./app');

const port = process.env.PORT || 80;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
