import { createContext } from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IPCFContext {
    context: ComponentFramework.Context<IInputs>
    data: string
}

export const PCFContext = createContext<IPCFContext>(undefined!);