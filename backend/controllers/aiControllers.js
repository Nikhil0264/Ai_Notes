import Notes from "../models/notesModel.js";
import { generateSummary } from "../services/summary.js";
import { extractText } from "../utils/extractPdfText.js";


export const chatWithAi = async(req,res)=>{
    try{
        const {noteId,question} = req.body;
        if(!noteId || !question){
            return res.status(400).json({
                message:"Provide All filled"
            })
        }
        const note = await Notes.findById({noteId});
        if(!note){
            return res.status(400).json({message:"Corresponding notes as not found"})
        }
        const answer = askQuestionFromNotes(note.summary,question);
        return res.status(201).json({answer})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Gemini failed to Load",error:error.message});
    }
}

