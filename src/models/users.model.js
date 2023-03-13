import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';


const UsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'User'] }
}, { timestamps: true });

UsersSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});
   
UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
  var user = this;
  if (bcrypt.compareSync(candidatePassword, user.password)) return true;
    return false;
};

   
UsersSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }

export const Users = model('Users', UsersSchema)