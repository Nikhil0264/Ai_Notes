import mongoose, { Types } from 'mongoose';

const quizSchema = new mongoose.Schema({
    noteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notes"
    },
    questions:[],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Quiz = mongoose.model("Quiz",quizSchema);
export default Quiz;//quiz functionality should be implimented
