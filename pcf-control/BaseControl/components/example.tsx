import * as React from "react";
import { memo, useContext } from "react";
import { PCFContext } from "../context/pcf-context";

const ExampleComponent = memo(() => {
    const { context } = useContext(PCFContext);

    return (
        <>
            {context.parameters.sampleProperty.raw}
        </>
    );
})
 
ExampleComponent.displayName = "ExampleComponent";
export default ExampleComponent;