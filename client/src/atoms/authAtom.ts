import { atom } from "recoil";

// Define the type for the auth screens as specific string literals.
type AuthScreen = "login" | "signup"; // Add additional screens as needed.

// Create the atom with the appropriate TypeScript type.
const authScreenAtom = atom<AuthScreen>({
  key: "authScreenAtom",
  default: "login",
});

export default authScreenAtom;
