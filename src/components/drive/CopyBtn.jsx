import React, {useEffect, useState} from 'react'
import {faCheck, faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from 'react-bootstrap';
import ReactTooltip from "react-tooltip";

export default function CopyBtn() {

    const [tooltipReference, setTooltipReference] = useState(null)

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
        <>
            <p ref={ref => setTooltipReference(ref)}
               data-tip='Copy Link'
               data-place ='left'
               data-offset="{'top': -5, 'left': -10}"/>
            <ReactTooltip/>
            <Button onClick={copy}
                    variant='outline-primary'
                    size='sm'
                    className='ms-2 mb-1'
                    onMouseEnter={() => ReactTooltip.show(tooltipReference)}
                    onMouseLeave={() => ReactTooltip.hide(tooltipReference)}>
                <FontAwesomeIcon icon={!copied ? faCopy : faCheck}/>
            </Button>
        </>
    )
}
