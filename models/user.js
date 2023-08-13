import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    // match: [
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    // ],
  },
  image: {
    type: String,
  },
});

/* if were working with a regular Express backend we would say something like 
const User =  model("User", userSchema);
export default User;
we would do this if we were working with a regular always on always running backend server but in nextJS its a bit 
different we said that the route is only going to be created and running for the time when it is getting called so there 
is one check we have to make. */

// The 'models' Object is provided by the mongoose library and stores all the registered models.
// If a model named 'User' is already exists in the 'models' object, it assign that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused. That because this route gets called everytime and the connection will be established every single time from scratch.

// If a model named 'User' does not exists in 'models' object, the 'model' funtion from mongoose is called to create a new model
// The newly created model is then assigned to the 'User' variable.

const User = models.User || model("User", userSchema);

export default User;
