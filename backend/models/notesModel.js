import mongoose, { Types } from 'mongoose';

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary:{
        type:String,
    },
    description: {
        type: String,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
