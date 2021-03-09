const { parsed: envs } = require("dotenv").config();
module.exports={
    MONGO_URI :envs.MONGO_URI,
    SECRET_KEY:envs.SECRET_KEY,   
    PORT: envs.PORT
  }

  