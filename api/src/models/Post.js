const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// connect to mongoDB
const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'}, // ref: 'User' → connect to User model
}, {
    timestamps: true, // createdAt, updatedAt
})

const PostModel = model('Post', PostSchema);

module.exports = PostModel;