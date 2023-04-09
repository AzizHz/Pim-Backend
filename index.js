const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const userRouter = require('./routes/user.js');
const cookieParser = require('cookie-parser');
const cardRouter = require('./routes/cards.js');
const resultsRouter = require('./routes/results.js');
const playerRouter = require('./routes/player.js');
const playersRouter = require('./routes/playersStats.js');
const truffleConfig = require('./truffle-config');
const DataRouter = require('./routes/DataRouter.js');



dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(cookieParser());
app.use("/card", cardRouter);
app.use("/user", userRouter);
app.use("/player", playerRouter);
app.use("/players", playersRouter);
app.use("/results", resultsRouter)
app.use("/Data", DataRouter)



const PORT = process.env.PORT || 3001;

app.get('/uploads/:id', (req, res) => {
  res.sendFile(path.join(__dirname, `./uploads/${req.params.id}`));
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  }));