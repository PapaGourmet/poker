import { getFirestore, } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import firebaseConfig from '../src/firebase-config'

const app = initializeApp(firebaseConfig, "cacs")
const dbDatabaseFirestore = getFirestore(app)

export default dbDatabaseFirestore