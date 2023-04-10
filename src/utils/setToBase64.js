const setFileToBase = (file) =>{
    return new Promise(resolve => {
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      }

    })

}

export default setFileToBase