import useStorage from '../hooks/useStorage';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './ProgressBar.css';
import { useEffect } from 'react';

interface ProgressProps {
  file: File;
  setFile(file: File | null): void;
}

export default function ProgressBar({ file, setFile }: ProgressProps) {

  const { progress, url, error } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile])

  return (
    error ? <div>مشکلی وجود داره. فایل آپلود نمیشه!</div> :
      <SkeletonTheme baseColor="#E76F51" highlightColor="#F4A261">
        <div className='bar'>
          <div className='progress-bar' style={{ width: progress + '%' }}>
            <Skeleton />
          </div>
        </div>
      </SkeletonTheme>
  )
}
