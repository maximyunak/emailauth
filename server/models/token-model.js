const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  isActivated: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

module.exports = model('Token', tokenSchema);
