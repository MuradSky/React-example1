import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import plus from './plus.svg'
import close from './close.svg'
import { useFormContext, useController } from 'react-hook-form';

type TP = {
    id?: string;
    name?: any;
    title?: string;
    accept?: string;
    disabled?: boolean;
}

export const FileUpload: React.FC<TP> = ({
    id,
    name,
    title,
    accept="image/*",
    disabled
}) => {
  const { setValue, control, watch } = useFormContext()
  const { field: { onChange } } = useController({ name, control })
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    onDrop: (acceptedFiles: any) => {
      setFiles(acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file)})));
    },
    multiple: false
  });

  const fileName = watch()[name]

  useEffect(() => {
    setFiles([])
  }, [fileName])

  useEffect(() => {
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  const thumbs = files.map((file: any) => (
    <div key={file.name} className="drozpone__img">
      <img src={file.preview} alt=""/>
      <p>{file.name}</p>
    </div>
  ));

  const onClear = () => {
    if(disabled) return
    setFiles([])
    setValue(name, undefined)
  }

  return (
    <section className="drozpone">
      {!files.length ? (
        <div {...getRootProps({className: 'drozpone__pad'})}>
        <input 
            id={id}
            name={name}
            {...getInputProps({ onChange })}
            disabled={disabled}
        />
        <p>{title}</p>
        <img src={plus} alt="" />
    </div>
      ) : (
        <aside className='drozpone__object'>
            {thumbs}
            <button onClick={onClear}>
                <img src={close} alt="" />
            </button>
        </aside>
      )}
    </section>
  );
}