import mongoose, { Types } from 'mongoose';

const quizSchema = mongoose.Schema({
    noteId:{
        type:Types.ObjectId,
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
