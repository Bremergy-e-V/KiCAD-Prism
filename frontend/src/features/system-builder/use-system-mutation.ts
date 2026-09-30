import { useCallback, useState } from "react";
import { toast } from "sonner";

import { StaleSystemError } from "@/lib/systems-api";

/**
 * Runs one system mutation at a time and re-reads the document afterwards.
 *
 * A 412 means someone else changed the system since it was read: the edit is
 * not retried blindly; the document is reloaded so the user sees the current
 * state and can redo the change deliberately.
 */
export function useSystemMutation(reload: () => Promise<void>) {
  const [busy, setBusy] = useState<string | null>(null);

  const run = useCallback(
    async <T,>(label: string, action: () => Promise<T>, success?: string): Promise<T | undefined> => {
      setBusy(label);
      try {
        const result = await action();
        if (success) {
          toast.success(success);
        }
        return result;
      } catch (error) {
        if (error instanceof StaleSystemError) {
          toast.warning("This system changed elsewhere. It has been reloaded; please try again.");
        } else {
          toast.error(error instanceof Error ? error.message : "The change failed");
        }
        return undefined;
      } finally {
        setBusy(null);
        await reload();
      }
    },
    [reload],
  );

  return { busy, run };
}

export type Mutate = ReturnType<typeof useSystemMutation>["run"];
