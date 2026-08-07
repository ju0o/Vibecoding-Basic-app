export const UserRole = {
  Guest: "guest",
  PendingMember: "pending_member",
  Member: "member",
  TrustedMember: "trusted_member",
  Moderator: "moderator",
  Admin: "admin",
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const UserStatus = {
  Active: "active",
  Suspended: "suspended",
  Withdrawn: "withdrawn",
} as const
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

export const ApplicationStatus = {
  Submitted: "submitted",
  Approved: "approved",
  Rejected: "rejected",
  Resubmitted: "resubmitted",
} as const
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

export const PostStatus = {
  Published: "published",
  Hidden: "hidden",
  Deleted: "deleted",
} as const
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]

export const MaterialStatus = {
  Draft: "draft",
  PendingReview: "pending_review",
  Community: "community",
  Official: "official",
  NeedsRevision: "needs_revision",
  Archived: "archived",
} as const
export type MaterialStatus = (typeof MaterialStatus)[keyof typeof MaterialStatus]

export const CommentStatus = {
  Published: "published",
  Hidden: "hidden",
  Deleted: "deleted",
} as const
export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus]

export const TargetType = {
  Post: "post",
  Material: "material",
} as const
export type TargetType = (typeof TargetType)[keyof typeof TargetType]

export const ReactionType = {
  Like: "like",
} as const
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType]

export const CategoryKind = {
  Community: "community",
  Material: "material",
} as const
export type CategoryKind = (typeof CategoryKind)[keyof typeof CategoryKind]

export const CategoryStatus = {
  Active: "active",
  Archived: "archived",
} as const
export type CategoryStatus = (typeof CategoryStatus)[keyof typeof CategoryStatus]

export const RequestStatus = {
  Submitted: "submitted",
  Approved: "approved",
  Rejected: "rejected",
} as const
export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]

export const ReportReason = {
  Spam: "spam",
  Abuse: "abuse",
  Illegal: "illegal",
  Copyright: "copyright",
  WrongInfo: "wrong_info",
  Other: "other",
} as const
export type ReportReason = (typeof ReportReason)[keyof typeof ReportReason]

export const ReportStatus = {
  Open: "open",
  InReview: "in_review",
  Resolved: "resolved",
  Dismissed: "dismissed",
} as const
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]

export const ModerationActionType = {
  HidePost: "hide_post",
  RestorePost: "restore_post",
  DeleteComment: "delete_comment",
  SuspendUser: "suspend_user",
  RestoreUser: "restore_user",
  PromoteMaterial: "promote_material",
  DemoteMaterial: "demote_material",
  ChangeRole: "change_role",
} as const
export type ModerationActionType = (typeof ModerationActionType)[keyof typeof ModerationActionType]

export const NotificationType = {
  CommentOnPost: "comment_on_post",
  CommentOnMaterial: "comment_on_material",
  ReplyToComment: "reply_to_comment",
  ReactionReceived: "reaction_received",
  MembershipApproved: "membership_approved",
  MembershipRejected: "membership_rejected",
  MaterialStatusChanged: "material_status_changed",
  CategoryRequestResolved: "category_request_resolved",
  ReportResolved: "report_resolved",
  AdminNotice: "admin_notice",
} as const
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

export const MediaProvider = {
  ImageKit: "imagekit",
} as const
export type MediaProvider = (typeof MediaProvider)[keyof typeof MediaProvider]

export const MediaAssetStatus = {
  Temporary: "temporary",
  Attached: "attached",
  PendingDelete: "pending_delete",
  Deleted: "deleted",
} as const
export type MediaAssetStatus = (typeof MediaAssetStatus)[keyof typeof MediaAssetStatus]
