import { getDatabase, ref, push, set, remove } from "firebase/database";
import { app } from "../firebase/firebaseConfig";

export const addFavorite = async (userId, product) => {
  const db = getDatabase(app); // app initialize edilmiş olmalı
  const favRef = ref(db, `users/${userId}/favorites`);
  const newFavRef = push(favRef); // benzersiz favId üretir

  await set(newFavRef, {
    barcode: product.barcode,
    name: product.name,
  });
};

export const removeFavorite = async (userId, favId) => {
  const db = getDatabase(app);
  const favRef = ref(db, `users/${userId}/favorites/${favId}`);
  await remove(favRef);
};
