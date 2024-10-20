import { useEffect, useState } from "react";
import { db, storage } from "../firebase/fbconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function useStorage(file: File) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {

    // storage refrence:
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // collection refrence : 
    const collectionRef = collection(db, 'images');

    //use uploadTask:
    const unsub = uploadTask.on("state_changed",
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            const createdAt = serverTimestamp();
            setUrl(downloadUrl);
            addDoc(collectionRef, { url: downloadUrl, createdAt })
          })
      });

    return () => {
      unsub();
    }
  }, [file]);

  return { progress, url, error };

}
