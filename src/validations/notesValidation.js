import { Joi, Segments } from 'celebrate';
// import { required } from 'joi';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(5).max(20),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(50).required(),
    content: Joi.string().valid(),
    tag: Joi.string().valid(...TAGS),
  }),
};

const objectIdValid = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  }
  return helpers.message('Invalid note ID!');
};
export const noteIdSchema = {
  [Segments.PARAMS]: Joj.object({
    noteId: Joi.string().custom(objectIdValid).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joj.object({
    noteId: Joi.string().custom(objectIdValid).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(50).value(),
    content: Joi.string().valid(),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};
