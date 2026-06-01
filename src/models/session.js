import { model, Schema } from 'mongoose';
// import { TAGS } from '../constants/tags.js';
// import { type } from 'node:os';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    accsessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export const Session = model('Session', sessionSchema);
