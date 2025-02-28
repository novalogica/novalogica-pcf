import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useDataverse } from "./hook/useDataverse";
import { PCFContext } from "./context/pcf-context";
import ExampleComponent from "./components/example";
import { error } from "console";

interface IProps {
  context: ComponentFramework.Context<IInputs>;
}
export const App = ({context}: IProps) => {
  const { data, isLoading, error } = useDataverse(context);

  if(isLoading) {
    return <p>{context.resources.getString("loading-message")}</p>
  }

  if(error) {
    return <p>{error}</p>
  }

  return ( 
    <FluentProvider theme={webLightTheme}>
      <PCFContext.Provider value={{ context, data }}>
        <div>
          <ExampleComponent />
        </div>
      </PCFContext.Provider>
    </FluentProvider>
  );
}