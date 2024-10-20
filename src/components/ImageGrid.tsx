import useFireStore from '../hooks/useFireStore'
import DeleteImage from '../assets/picture/delete-icon.svg'
import './ImageGrid.css'
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase/fbconfig';
import { deleteObject, ref } from 'firebase/storage';

interface ImageGridProps {
  setImage(image: string): void
}

export default function ImageGrid({ setImage }: ImageGridProps) {

  const { documents } = useFireStore('images');

  return (
    <div className='img-grid'>
      {
        documents && documents.map(doc => (
          <div className='grid-item' key={doc.id} >
            <img
              className='main-img'
              src={doc.url}
              alt="main-image"
              onClick={() => { setImage(doc.url) }}
            />
            <img
              className="del-butt"
              src={DeleteImage}
              alt='delete-img'
              onClick={() => { handleDelete(doc.id, doc.url) }}
            />
          </div>
        ))
      }
    </div>
  )

  async function handleDelete(id: string, url: string) {
    const docRefrence = doc(db, 'images', id);
    await deleteDoc(docRefrence);
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  }
}
