import { createContext} from "react";

const UserContext = createContext({
  userName: "",
  setUserName: () => {}
});


export {UserContext}