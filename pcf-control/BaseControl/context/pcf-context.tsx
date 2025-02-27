import { createContext } from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IPCFContext {
    context: ComponentFramework.Context<IInputs>
}

export const PCFContext = createContext<IPCFContext>(undefined!);