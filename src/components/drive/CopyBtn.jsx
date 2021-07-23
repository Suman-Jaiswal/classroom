import React, { useState } from 'react'
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

export default function CopyBtn() {

    const [copied, setCopied] = useState(false);

    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }
    useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }, 2000);
    }, [copied])

    return (
        <div>
            <Button onClick={copy} variant='outline-primary' size='md' className='m-2'>
                <FontAwesomeIcon icon={!copied ? faCopy : faCheck} />
            </Button>
        </div>
    )
}
