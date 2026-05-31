import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';
// import { type } from 'node:os';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      trim: true,
      enum: TAGS,
      default: 'Todo',
    },
  },
  {
    timestamps: true,
  },
);
export const Note = model('Note', noteSchema);
