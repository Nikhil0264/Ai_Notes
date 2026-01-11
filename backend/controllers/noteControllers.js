import Notes from "../models/notesModel.js";

export const uploadNotes = async(req,res)=>{
    try{
        const {title,description} = req.body;
        if(!title || !description){
            return res.status(400).json({message:"Provide All information"});
        }
        const file = req.file;
        const id = req.user.id;
        const notes = await Notes.create({
            title,description,fileUrl:file.path,createdBy:id
        })
        return res.status(201).json({
            message:"pdf upload successfully",
        })
    }catch(error){
        console.log(error);
        return res.status(500),json({message:"Error in uploading notes",error:error.message})
    }
}

export const getAllNotes = async(req,res)=>{
    try{
        const notes = await Notes.find().select("-__v");
        return res.status(200).json({
            success: true,
            count: notes.length,
            notes
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
