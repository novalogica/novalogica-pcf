import * as React from "react";
import { memo, useContext } from "react";
import { PCFContext } from "../context/pcf-context";

const ExampleComponent = memo(() => {
    const { data, context } = useContext(PCFContext);

    return (
        <>
            <p>Data: {data}</p>
        </>
    );
})

ExampleComponent.displayName = "ExampleComponent";
export default ExampleComponent;