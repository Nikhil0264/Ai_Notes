import axios from "axios"
import pdf from "pdf-parse";

export const extractText = async(fileUrl)=>{
    try{
        const response = await axios.get(fileUrl,{
            responseType: "arraybuffer"
        })
        const pdfBuffer = Buffer.from(response.data);
        const data = await pdf(pdfBuffer);
        return data.text;
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error while sending to Ai",error:error.message});
    }
}