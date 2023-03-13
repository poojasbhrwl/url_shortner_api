import { model, Schema } from 'mongoose';

const UrlsSchema = new Schema({
  originalUrl: { type: String, required: true, unique : true },
  shortUrl: { type: String, required: true},
  code: { type: String, required: true, unique : true},
}, { timestamps: true });

export const Urls = model('Urls', UrlsSchema);