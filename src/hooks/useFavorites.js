import { onValue, ref, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { app } from "../firebase/firebaseConfig";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useAuth();
  const db = getDatabase(app);

  useEffect(() => {
    if (!userId) return;

    const favRef = ref(db, `users/${userId}/favorites`);
    const unsubscribe = onValue(favRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setFavorites(favArray);
      } else {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return favorites;
};
