import fs from "fs";
import Notes from "../models/notesModel.js";
import { extractText } from "../utils/extractPdfText.js";
import { generateSummary } from "../services/summary.js";
import { uploadPdfToCloudinary } from "../middlewares/cloudlink.js";

export const uploadNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title)
    console.log(req.file)
    console.log(description)
    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "All fields required" });
    }

    const localPath = req.file.path;
    const userId = req.user.id;


    const text = await extractText(localPath);
    // const summary = await generateSummary(text);
    const cloudinaryUrl = await uploadPdfToCloudinary(localPath);


    fs.unlinkSync(localPath);

  
    const note = await Notes.create({
      title,
      description,
      // summary,
      fileUrl: cloudinaryUrl,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "PDF uploaded successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};




export const getAllNotes = async(req,res)=>{
    try{
        const notes = await Notes.find().select("-__v");
        console.log(notes)
        const notesData = notes.map(note => ({
          id: note._id,
          title: note.title,  
          description: note.description,
          fileUrl: note.fileUrl,
          createdAt: note.createdAt,
        }));
        return res.status(200).json({
            success: true,
            count: notes.length,
            notes:notesData,
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Error while getting notes",error:error.message})
    }
}

export const getNoteById = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching note",
      error: error.message
    });
  }
};
