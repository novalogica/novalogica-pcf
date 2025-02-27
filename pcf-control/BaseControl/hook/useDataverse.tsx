import { useState, useEffect, useMemo } from "react";
import { IInputs } from "../generated/ManifestTypes";
import { XrmService } from "./service";

export const useDataverse = (context: ComponentFramework.Context<IInputs>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const xrmService = useMemo(() => {
    const service = XrmService.getInstance();
    service.setContext(context);
    return service;
  }, [context]);

  useEffect(() => {
   

    loadData();
  }, []);

  const loadData = async () => {
    try {
      //Retrieve data here
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }; 

  const fetchAttributes = async (entityName: string): Promise<object[]> => {
    const result = await xrmService.fetch(
      `api/data/v9.1/EntityDefinitions(LogicalName='${entityName}')/Attributes?$select=LogicalName,AttributeType,DisplayName&$filter=AttributeOf eq null&$orderby=DisplayName asc`,
    );

    return result;
  }

  const fetchRecord = async (entityName: string, id: string, options: string): Promise<ComponentFramework.WebApi.Entity> => {
    return await context.webAPI.retrieveRecord(entityName, id, options);
  };

  return {
    isLoading,
    error,
  };
};