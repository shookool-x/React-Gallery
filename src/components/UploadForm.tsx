import { ChangeEvent, useState } from 'react';
import './UploadForm.css';
import ProgressBar from './ProgressBar';

const types = ['image/jpeg', 'image/png'];

export default function UploadForm() {

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  return (
    <form>
      <label className='choose-file'>
        + افـــــزودن تصویر
        <input type="file" onChange={handleChange} />
      </label>
      <div className="output-form">
        {error && <div>{error}</div>}
        {file && <div className='out-file'>&gt;&gt;&nbsp;&nbsp;{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  )

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let selectImage = e.target.files;

    if (selectImage && types.includes(selectImage[0].type)) {
      setFile(selectImage[0]);
      setError('')
    } else {
      setFile(null)
      setError('فرمـــت فایل ورودی درست نیست. لطفا از jpeg یا png استفاده کنید.')
    }
  }
}
