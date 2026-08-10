import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { getFirestore } from '@/lib/firebase/client'
import { UserRole, ApplicationStatus } from '@/lib/firebase/types'
import { type UserData } from '@/lib/firebase/user-service'

export type { UserData } from '@/lib/firebase/user-service'

/**
 * Get all pending member applications
 */
export async function getPendingMembers(): Promise<UserData[]> {
  const db = getFirestore()
  const q = query(
    collection(db, 'users'),
    where('role', '==', UserRole.PendingMember),
    where('applicationStatus', '==', ApplicationStatus.Submitted),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as UserData[]
}

/**
 * Get all users by role
 */
export async function getUsersByRole(role: UserRole): Promise<UserData[]> {
  const db = getFirestore()
  const q = query(
    collection(db, 'users'),
    where('role', '==', role),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as UserData[]
}

/**
 * Get all rejected applications
 */
export async function getRejectedApplications(): Promise<UserData[]> {
  const db = getFirestore()
  const q = query(
    collection(db, 'users'),
    where('applicationStatus', '==', ApplicationStatus.Rejected),
    orderBy('rejectedAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as UserData[]
}
