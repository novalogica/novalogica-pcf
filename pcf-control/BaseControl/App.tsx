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
        <div style={styles.main}>
            <ExampleComponent />
        </div>
      </PCFContext.Provider>
    </FluentProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    width: '100%', 
    height: '100vh',
    backgroundColor: '#f0f0f0'
  }
}