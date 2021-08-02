import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function DownloadBtn(props) {

    // had to use the blob url method because the download attribute of anchor tag does NOT work while using cross-origin urls.

    function handleButtonClick() {
        fetch(props.downloadUrl)
            .then(response => response.blob())
            .then(blob => {
                const blobURL = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = blobURL
                a.style.display = 'none'
                if (props.name && props.name.length) {
                    a.download = props.name
                }
                document.body.appendChild(a)
                a.click()
                a.remove()
            })
            .catch(() => {
                toast.error('An error occurred while downloading the file!')
            });
    }

    return (
        <Button
            variant={'transparent'}
            onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faDownload} />
        </Button>
    );
}

export default DownloadBtn;
