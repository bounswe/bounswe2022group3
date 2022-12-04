import React from 'react'
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function PhotoWidgetCropper({imagePreview, setCropper}) {
    return (
        <Cropper 
            src={imagePreview}
            style={{height: '200px', width: '100%', marginTop: "15px"}}
            initialAspectRatio={1}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}

export default PhotoWidgetCropper