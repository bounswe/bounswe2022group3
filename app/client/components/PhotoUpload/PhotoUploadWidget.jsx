import React, { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import styles from "./PhotoUploadWidget.module.scss";

function PhotoUploadWidget({ setFiles, files, setCropper }) {

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    return (
        <div className={styles.stackable_grid_wrapper} style={{width: "100%"}}>
            <div className={styles.stackable_grid_three}>
                <div className={styles.column_of_three}>
                    <h3 className={styles.heading_tertiary}>STEP 1 - ADD IMAGE</h3>
                    <PhotoWidgetDropzone setFiles={setFiles} />
                </div>
                <div className={styles.column_of_three}>
                    <h3 className={styles.heading_tertiary}>STEP 2 - RESIZE IMAGE</h3>
                    {files && files.length > 0 && (
                        <PhotoWidgetCropper
                            setCropper={setCropper}
                            imagePreview={files[0].preview}
                        />
                    )}
                </div>
                <div className={styles.column_of_three}>
                    <h3 className={styles.heading_tertiary}>
                        STEP 3 - PREVIEW
                    </h3>
                    {files && files.length > 0 && (
                        <>
                            <div
                                className="img-preview"
                                style={{ minHeight: 200, overflow: "hidden", marginTop: "15px" }}
                            />
                            {/* <div style={{marginTop: "2rem"}}>
                                <button className="btn btn--purple btn--mini" onClick={(e) => onCrop(e)}><i className="fa fa-check" aria-hidden="true"></i></button>
                                <button className="btn btn--purple btn--mini btn--inverted" onClick={() => setFiles([])}><i className="fa fa-times" aria-hidden="true"></i></button>
                            </div> */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PhotoUploadWidget;