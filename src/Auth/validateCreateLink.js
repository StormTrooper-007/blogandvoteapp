
function validateCreateLink(values) {
    let errors = {}

       //Description related errors
       if(!values.description){
        errors.description = "Description required"
    }else if(values.description.length < 6) {
        errors.description="description must contain more than 6 characters"
    }
    //url related errors
    if(!values.url){
        errors.url = "URL is required"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = 'Must be a valid URL'
    }
    return errors
}

export default validateCreateLink
