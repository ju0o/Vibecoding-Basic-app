import { doc, getDoc, setDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { getFirestore } from '@/lib/firebase/client'
import { UserRole, UserStatus, ApplicationStatus } from '@/lib/firebase/types'

export interface UserData {
  uid: string
  email: string
  displayName: string
  photoURL: string
  role: UserRole
  status: UserStatus
  applicationStatus?: ApplicationStatus
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
  approvedAt?: Timestamp | null
  approvedBy?: string | null
  rejectedAt?: Timestamp | null
  rejectedBy?: string | null
  rejectionReason?: string | null
}

export interface CreateUserInput {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role?: UserRole
  status?: UserStatus
  applicationStatus?: ApplicationStatus
}

export interface UpdateUserInput {
  displayName?: string
  photoURL?: string
  role?: UserRole
  status?: UserStatus
  applicationStatus?: ApplicationStatus
  approvedAt?: Timestamp
  approvedBy?: string
  rejectedAt?: Timestamp
  rejectedBy?: string
  rejectionReason?: string
}

/**
 * Get user data by UID
 */
export async function getUser(uid: string): Promise<UserData | null> {
  const db = getFirestore()
  const userDoc = await getDoc(doc(db, 'users', uid))

  if (!userDoc.exists()) {
    return null
  }

  return userDoc.data() as UserData
}

/**
 * Create new user document
 */
export async function createUser(input: CreateUserInput): Promise<void> {
  const db = getFirestore()
  const now = serverTimestamp()

  const userData: Omit<UserData, 'uid'> = {
    email: input.email,
    displayName: input.displayName,
    photoURL: input.photoURL || '',
    role: input.role || UserRole.PendingMember,
    status: input.status || UserStatus.Active,
    applicationStatus: input.applicationStatus || ApplicationStatus.Submitted,
    createdAt: now as any,
    updatedAt: now as any,
  }

  await setDoc(doc(db, 'users', input.uid), userData)
}

/**
 * Update user data
 */
export async function updateUser(uid: string, input: UpdateUserInput): Promise<void> {
  const db = getFirestore()
  const updateData: any = {
    ...input,
    updatedAt: serverTimestamp(),
  }

  await updateDoc(doc(db, 'users', uid), updateData)
}

/**
 * Approve user (pending_member -> member)
 */
export async function approveUser(uid: string, approvedByUid: string): Promise<void> {
  await updateUser(uid, {
    role: UserRole.Member,
    applicationStatus: ApplicationStatus.Approved,
    approvedAt: Timestamp.now(),
    approvedBy: approvedByUid,
  })
}

/**
 * Reject user application
 */
export async function rejectUser(
  uid: string,
  rejectedByUid: string,
  reason?: string
): Promise<void> {
  const updateData: UpdateUserInput = {
    applicationStatus: ApplicationStatus.Rejected,
    rejectedAt: Timestamp.now(),
    rejectedBy: rejectedByUid,
    ...(reason !== undefined ? { rejectionReason: reason } : {}),
  }
  await updateUser(uid, updateData)
}

/**
 * Suspend user
 */
export async function suspendUser(uid: string): Promise<void> {
  await updateUser(uid, {
    status: UserStatus.Suspended,
  })
}

/**
 * Reactivate user
 */
export async function reactivateUser(uid: string): Promise<void> {
  await updateUser(uid, {
    status: UserStatus.Active,
  })
}

/**
 * Withdraw user (soft delete)
 */
export async function withdrawUser(uid: string): Promise<void> {
  await updateUser(uid, {
    status: UserStatus.Withdrawn,
  })
}

/**
 * Check if user is admin
 */
export async function isAdmin(uid: string): Promise<boolean> {
  const user = await getUser(uid)
  return user?.role === UserRole.Admin
}

/**
 * Check if user is member (member, trusted_member, moderator, or admin)
 */
export async function isMember(uid: string): Promise<boolean> {
  const user = await getUser(uid)
  if (!user) return false

  const memberRoles = [
    UserRole.Member,
    UserRole.TrustedMember,
    UserRole.Moderator,
    UserRole.Admin,
  ] as const

  return memberRoles.includes(user.role as any) && user.status === UserStatus.Active
}
