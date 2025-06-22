import { useState, useEffect } from "react";
import { onValue, ref, getDatabase } from "firebase/database";
import { useAuth } from "@clerk/clerk-expo";
import { app } from "../firebase/firebaseConfig";

export const useConsumedToday = () => {
  const [consumed, setConsumed] = useState([]);
  const { userId } = useAuth();
  const db = getDatabase(app);

  useEffect(() => {
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10);
    const refPath = ref(db, `consumed/${userId}/${today}`);

    const unsubscribe = onValue(refPath, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([barcode, value]) => ({
          barcode,
          ...value,
        }));
        setConsumed(items);
      } else {
        setConsumed([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return consumed;
};
