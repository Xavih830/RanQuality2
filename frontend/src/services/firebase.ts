import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { Preferences } from '@capacitor/preferences';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getUserId = async () => {
  const { value } = await Preferences.get({ key: 'user_id' });
  
  if (value) return value;


  const newId = 'user_' + Math.random().toString(36).slice(2, 11) + Date.now();
  await Preferences.set({
    key: 'user_id',
    value: newId,
  });
  
  return newId;
};

const saveSongbyCat = async (categoria : string, titulo : string, url : string) => {
    const userId = await getUserId();

    const usersSongRef = ref(db, `usuarios/${userId}/${categoria}`);
    const user = push(usersSongRef);
    try {
        await set(user, {
            title: titulo,
            link: url
        });

        return {
            success: true,
            message: "Todo bien"
        };

    } catch (error:any) {
        return {
            success: false,
            message: error.message
        }
    }
};

const getSongsByCat = async (categoria : string) => {
    const userId = await getUserId();

    const user = ref(db, `usuarios/${userId}/${categoria}`);
    try {
        const ans = await get(user);

        return {
            success: ans.exists(),
            data: ans.val()
        }

    } catch (error) {
        return {
            success: false,
            data: "No hay datos"
        }
    }
};

export { saveSongbyCat, getSongsByCat };