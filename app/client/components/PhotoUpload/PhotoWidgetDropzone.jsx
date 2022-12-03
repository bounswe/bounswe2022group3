import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload';

function PhotoWidgetDropzone({setFiles}) {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        marginTop: '15px',
        textAlign: 'center',
        height: 200,
        outline: "none"
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles} >
            <input {...getInputProps()} />  
            <FileUploadIcon style={{fontSize: "70px"}} />
            <h2 style={{marginTop: "1rem"}}>Drop image here</h2>
        </div>
    )
}

export default PhotoWidgetDropzone