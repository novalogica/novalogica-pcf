import { IInputs } from "../generated/ManifestTypes";

export const useNavigation = (context: ComponentFramework.Context<IInputs>) => {
    const openForm = async (entityName: string, id?: string): Promise<void> => {
        const pageInput = {
            entityName: entityName,
            entityId: id,
            pageType: "entityrecord"
        } as ComponentFramework.NavigationApi.EntityFormOptions;

        await context.navigation.openForm(pageInput, { target: "1" })
    }

    const openConfirmationDialog = async (title: string, text: string, confirmButtonLabel: string, cancelButtonLabel: string): Promise<boolean> => {
        const response = await context.navigation.openConfirmDialog(
            {
                title: context.resources.getString(title),
                text: context.resources.getString(text),
                confirmButtonLabel: context.resources.getString(confirmButtonLabel),
                cancelButtonLabel: context.resources.getString(cancelButtonLabel),
            }
        );

        return response.confirmed;
    }

    return {
        openForm,
        openConfirmationDialog
    }
}