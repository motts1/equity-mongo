import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    id: String,
    artistId: String,
    userName: String,
    // artistName: String,
    // title: String,
    // type: String,
    // bio: String,
    // location: String,
    // followers: Number,
    // plays: Number,
    // trackCount: Number,
    // soundcloud: String,
    // subscribers: Number,
    // artist: String,
    // price: Number,
    // genre: String,
    // image: String,
    // backImage: String,
    // link1: String,
    // link2: String,
});
export default model('User', UserSchema);