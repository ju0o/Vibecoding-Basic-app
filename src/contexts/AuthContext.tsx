'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getFirebaseAuth, getFirestore } from '@/lib/firebase/client'
import { UserRole, UserStatus, ApplicationStatus } from '@/lib/firebase/types'

interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: UserRole
  status: UserStatus
  createdAt: Date | null
}

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  login: (provider: 'google' | 'github') => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string, displayName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser)

      if (fbUser) {
        const db = getFirestore()
        const userDoc = await getDoc(doc(db, 'users', fbUser.uid))

        if (userDoc.exists()) {
          const data = userDoc.data()
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            photoURL: fbUser.photoURL,
            role: data['role'] || UserRole.Member,
            status: data['status'] || UserStatus.Active,
            createdAt: data['createdAt']?.toDate() || null,
          })
        } else {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            photoURL: fbUser.photoURL,
            role: UserRole.Guest,
            status: UserStatus.Active,
            createdAt: null,
          })
        }
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (provider: 'google' | 'github') => {
    const auth = getFirebaseAuth()
    const { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } = await import('firebase/auth')

    const providerInstance = provider === 'google'
      ? new GoogleAuthProvider()
      : new GithubAuthProvider()

    await signInWithPopup(auth, providerInstance)
  }

  const logout = async () => {
    const auth = getFirebaseAuth()
    await signOut(auth)
  }

  const signup = async (email: string, password: string, displayName: string) => {
    const auth = getFirebaseAuth()
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })

    const db = getFirestore()
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      displayName,
      role: UserRole.PendingMember,
      status: UserStatus.Active,
      applicationStatus: ApplicationStatus.Submitted,
      createdAt: serverTimestamp(),
    })
  }

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
