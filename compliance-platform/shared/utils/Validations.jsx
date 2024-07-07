export const blobValidation=(blob, onlyImage)=>{
    var allowedTypes =onlyImage ? /\.(jpe?g|png|mp4)$/i : /\.(jpe?g|png|pdf|mp4)$/i
    if (!allowedTypes.test(blob?.name)) 
        return (
            {
                success:false, 
                message: onlyImage ? 'Allowed formats are JPEG, JPG, PNG only' : 'File type should be JPG, PNG, PDF only'
            }
        )
    else if (blob.size > 10000000)
        return ({success:false, message:`${onlyImage?"image":'file'} size should be less than 10 mbs`})
    return {success:true}
}