import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebase/firebaseConfig";

export const useWeeklyConsumed = (userId) => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const db = getDatabase(app);
      const userRef = ref(db, `consumed/${userId}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) return;

      const rawData = snapshot.val();
      const today = new Date();
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        return d.toISOString().slice(0, 10);
      });

      const safeParse = (val) => {
        const num = parseFloat(val);
        return isNaN(num) || !isFinite(num) ? 0 : num;
      };

      const result = last7Days.reverse().map((date) => {
        const dayData = rawData[date] || {};
        let calories = 0;
        let carbs = 0;
        let proteins = 0;
        let fat = 0;

        Object.values(dayData).forEach((item) => {
          const n = item.nutriments || {};
          calories += safeParse(n["energy-kcal_serving"]);
          carbs += safeParse(n.carbohydrates);
          proteins += safeParse(n.proteins);
          fat += safeParse(n.fat);
        });

        return {
          date,
          calories,
          carbs,
          proteins,
          fat,
        };
      });

      setWeeklyData(result);
    };

    fetchData();
  }, [userId]);

  return weeklyData;
};
