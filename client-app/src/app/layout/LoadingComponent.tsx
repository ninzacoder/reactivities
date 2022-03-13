import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props{
    content: string;
    inverted: boolean;
}

export default function LoadingComponent({content, inverted}: Props){

    return (
        <Dimmer active={true} inverted={inverted} >
            <Loader content={content} />
        </Dimmer>
    )
}