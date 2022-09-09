const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const yucaCubana = {
  title: "Yuca cubana",
  level: "Amateur Chef",
  ingredients: ["yuca", "salt", "olive oil", "onion", "garlic", "lemon juice"],
  cuisine: "Cuban",
  dishType: "other",
  image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9322809.jpg&w=595&h=595&c=sc&poi=face&q=60&orient=true",
  duration: 25,
  creator: "Marisabel"
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(yucaCubana)
  })
  .then(savedRecipe => {
    console.log("Yuca Cubana has been added: ", savedRecipe)
    return Recipe.insertMany(data);
  })
  .then(savedRecipeArray => {
    console.log("These have been added: ", savedRecipeArray);
    const filter = {title: "Rigatoni alla Genovese"};
    const update = {duration: 100};
    const opts = {new: true, upsert: true};
    return Recipe.findOneAndUpdate(filter, update, opts);
  })
  .then(result => {
    console.log("Success, the following recipe was updated: ", result);
    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  .then(result => {
    console.log("This recipe has been deleted: ", result);
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
// 