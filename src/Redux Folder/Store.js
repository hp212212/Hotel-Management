import { createStore } from "redux";
import CombinedRedusers from "./CombinedRedusers";

export const store=createStore(CombinedRedusers)