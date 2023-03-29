import React, { createContext, useReducer, ReactNode, useContext } from "react";
import dateReducer from "./dateReducer";
import moment from "moment";

interface DateState {
  date: string;
  dateFormatted: string;
  todayFormatted: string;
  dateTimeUTC: string;
}

interface DateContextType extends DateState {
  dispatch: React.Dispatch<any>;
}

const initialDateState: DateState = {
  date: moment().format("ddd, MMMM Do"),
  dateFormatted: moment().format("YYYYMMDD"),
  todayFormatted: moment().format("YYYYMMDD"),
  dateTimeUTC: new Date().toISOString(),
};

const DateContext = createContext<DateContextType>({
  ...initialDateState,
  dispatch: () => null,
});

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [date, dispatch] = useReducer(dateReducer, initialDateState);
  return (
    <DateContext.Provider value={{ ...date, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  return useContext(DateContext);
};

export default useDate;
