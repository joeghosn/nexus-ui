import { z } from "zod";

const roleEnum = z.enum(["OWNER", "ADMIN", "MEMBER"], {
  message: "Role must be OWNER, ADMIN, or MEMBER",
});

// Invite member to workspace
export const inviteMemberSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  role: roleEnum,
});

// Resend invitation email
export const resendInviteSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

// Update member role
export const updateMemberRoleSchema = z.object({
  role: roleEnum,
});

export type InviteMemberData = z.infer<typeof inviteMemberSchema>;
export type ResendInviteData = z.infer<typeof resendInviteSchema>;
export type UpdateMemberRoleData = z.infer<typeof updateMemberRoleSchema>;
