import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useDataverse } from "./hook/useDataverse";
import { PCFContext } from "./context/pcf-context";
import ExampleComponent from "./components/example";

interface IProps {
  context: ComponentFramework.Context<IInputs>;
}
export const App = ({context}: IProps) => {
  const dataverse = useDataverse(context);

  return ( 
    <FluentProvider theme={webLightTheme}>
      <PCFContext.Provider value={{ context }}>
        <div>
            <ExampleComponent />
        </div>
      </PCFContext.Provider>
    </FluentProvider>
  );
}