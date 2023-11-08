import { atom } from "recoil";

// Define the Table type according to your Mongoose model
type Table = {
  tableNumber: number;
  username: string;
  password: string;
  capacity: number;
  isOccupied: boolean;
};

// Parse the localStorage data into the Table type
const localStorageItem = localStorage.getItem("user-threads");
const defaultTableData: Table | null = localStorageItem
  ? JSON.parse(localStorageItem)
  : null;

// Update the userAtom to use the Table type
const userAtom = atom<Table | null>({
  key: "userAtom",
  default: defaultTableData,
});

export default userAtom;
