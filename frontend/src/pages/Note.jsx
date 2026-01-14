import React from 'react'

const Note = (fileUrl) => {
    const handleEachnote  = async(fileUrl) =>{
      try{
        const res = await axios.get(fileUrl);
      }catch(error){
        console.log(error);

      }
    }
  return (
    <div>
      
    </div>
  )
}

export default Note
