import { storage } from "../utils/firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL
  } from "firebase/storage";
import { v4 } from "uuid";

export async function uploadImage(image){
      if (image == null) return;

      const imageRef = ref(storage, `img/${image.name + v4()}`);
      const url = await uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            return url
        });
      })

      return url

}