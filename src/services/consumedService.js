// src/services/consumedService.js
import { getDatabase, ref, set, remove } from "firebase/database";
import { app } from "../firebase/firebaseConfig";

// Ürün tüketim listesine ekle
export const addToConsumed = async (userId, product) => {
  const db = getDatabase(app);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const itemRef = ref(db, `consumed/${userId}/${today}/${product.id}`);
  await set(itemRef, {
    name: product.product_name,
    time: new Date().toISOString(),
    nutriments: product.nutriments,
  });
};

// Tüketim listesinden çıkar
export const removeFromConsumed = async (userId, barcode) => {
  const db = getDatabase(app);
  const today = new Date().toISOString().slice(0, 10);
  const itemRef = ref(db, `consumed/${userId}/${today}/${barcode}`);
  await remove(itemRef);
};

export const cleanOldConsumed = async (userId) => {
  const db = getDatabase(app);
  const userConsumedRef = ref(db, `consumed/${userId}`);

  const snapshot = await get(userConsumedRef);
  if (!snapshot.exists()) return;

  const data = snapshot.val();
  const today = new Date().toISOString().slice(0, 10);

  const oldDates = Object.keys(data).filter((date) => date !== today);

  for (const date of oldDates) {
    const dateRef = ref(db, `consumed/${userId}/${date}`);
    await remove(dateRef);
  }
};
