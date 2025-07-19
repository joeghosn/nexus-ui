import { z } from "zod";

// Workspace name validation for create/update operations
export const workspaceSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Workspace name must be at least 3 characters long" })
    .max(50, { message: "Workspace name must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9\s\-_]+$/, {
      message:
        "Workspace name can only contain letters, numbers, spaces, hyphens, and underscores",
    }),
});

// Delete workspace confirmation
export const deleteWorkspaceSchema = z.object({
  confirmationText: z
    .string()
    .min(1, { message: "Please type the workspace name to confirm deletion" }),
});

export type WorkspaceData = z.infer<typeof workspaceSchema>;
export type DeleteWorkspaceData = z.infer<typeof deleteWorkspaceSchema>;
