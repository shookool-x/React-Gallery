import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/fbconfig";

interface DocType {
  id: string;
  createdAt: string;
  url: string
}

export default function useFireStore(collectionName: string) {
  const [documents, setDocuments] = useState<DocType[] | null>(null);
  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      let myData: DocType[] = [];
      snapshot.forEach(doc => {
        myData.push({
          createdAt: doc.data().createdAt || '',
          url: doc.data().url || '',
          id: doc.id
        })
      });
      setDocuments(myData);
    });

    return () => unsub();

  }, [collectionName]);

  return { documents };
}
