import Title from './components/Title'
import './App.css'
import UploadForm from './components/UploadForm'
import ImageGrid from './components/ImageGrid'
import { useState } from 'react'
import Modal from './components/Modal'

export default function App() {

  const [image, setImage] = useState<string>('')

  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid setImage={setImage} />
      {image && <Modal image={image} setImage={setImage} />}
    </div>
  )
}
