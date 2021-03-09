const { parsed: envs } = require("dotenv").config();
module.exports={
    MONGO_URI:envs.MONGO_URI,
    JWT_SECRET:envs.JWT_SECRET,   
    PORT: envs.PORT
  }

  