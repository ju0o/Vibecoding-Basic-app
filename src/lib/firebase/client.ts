import { type FirebaseApp, initializeApp } from "firebase/app"
import { type Auth, connectAuthEmulator, getAuth } from "firebase/auth"
import {
  connectFirestoreEmulator,
  type Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore"

const FIREBASE_CONFIG = {
  apiKey: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"] ?? "",
  authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"] ?? "",
  projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"] ?? "",
  appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"] ?? "",
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let firestore: Firestore | null = null

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(FIREBASE_CONFIG)
  }
  return app
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
    const emulatorHost = process.env["NEXT_PUBLIC_EMULATOR_HOST"]
    if (process.env["NODE_ENV"] === "development" && emulatorHost) {
      connectAuthEmulator(auth, `http://${emulatorHost}:9099`)
    }
  }
  return auth
}

export function getFirestore(): Firestore {
  if (!firestore) {
    const fbApp = getFirebaseApp()
    firestore = initializeFirestore(fbApp, {
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager({}),
      }),
    })
    const emulatorHost = process.env["NEXT_PUBLIC_EMULATOR_HOST"]
    if (process.env["NODE_ENV"] === "development" && emulatorHost) {
      connectFirestoreEmulator(firestore, emulatorHost, 8080)
    }
  }
  return firestore
}
