import pool from "../database/db";

export const database = async () => {
  try {
    await pool.query("SELECT 1");

    return true;
  } catch {
    return false;
  }
};
