import { useCallback, useState } from "react";
import { IError } from "../core/types/IError";
import { isError } from "../core/utils/isError";

export const useRequest = (): [
  send: (
    block: () => Promise<void>,
    errorHandler?: (error: any) => boolean
  ) => Promise<void>,
  isProcessing: boolean
] => {
  const [isProcessing, setIsProcessing] = useState(false);
  // const toast = useToast();
  // const navigate = useNavigate();

  const handleError = useCallback((error: IError) => {
    // unknown error navigate to error boundary page
    console.log("Unknown error due to REST request.");
    // navigate(AppRoutes.error.toPath());
  }, []);

  const send = useCallback(
    async (
      block: () => Promise<void>,
      errorHandler?: (error: any) => boolean
    ) => {
      // leave, if request is already running,
      if (isProcessing === true) {
        return;
      }

      setIsProcessing(true);
      try {
        await block();
      } catch (error) {
        // does an error handler handles the error?
        if (!errorHandler || !errorHandler(error)) {
          if (isError(error)) {
            handleError(error);
          } else {
            // unknown error navigate to error boundary page
            console.log("Unknown error due to REST request.");
            // navigate(AppRoutes.error.toPath());
          }
        }
      }
      setIsProcessing(false);
    },
    [handleError, isProcessing]
  );

  return [send, isProcessing];
};
