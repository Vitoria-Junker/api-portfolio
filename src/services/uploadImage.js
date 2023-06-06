import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase.js";

export const uploadImage = (img) => {
    
    const storageRef = ref(storage, `images/${img.originalname}`)
    console.log(img)
    const uploadTask = uploadBytesResumable(storageRef, img.buffer)
    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
  (snapshot) => {
    // monitorar o progresso do upload
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload progress: ${progress}%`);
  },
  (error) => {
    // tratar erros durante o upload
    console.log(error);
    reject(error);
  },
  () => {
    // Callback para quando o upload é concluído com sucesso
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      resolve(url);
    });
  }
);
    })
};