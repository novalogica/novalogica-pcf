import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { App } from "./App";

export class BaseControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private control: ComponentFramework.ReactControl<IInputs, IOutputs>;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        context.mode.trackContainerResize(true);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        return React.createElement(App, { context });
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        this.control.destroy();
    }
}
