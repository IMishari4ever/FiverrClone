module.exports = {

  database: process.env.DATABASE || 'mongodb+srv://mishari:123@cluster0.rv5mp.mongodb.net/natours?retryWrites=true&w=majority',
  port: process.env.PORT || 4000,
  secret: process.env.JWT_SECRET || '',

}
