import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export interface DateState {
  date: string; // 'Wed, March 29th'
  dateFormatted: string; // '20230329'
  dateTimeUTC: string; // '2023-03-29T00:00:00.0000Z'
  todayFormatted: string; // '20230329'
}

const initialState: DateState = {
  date: moment().isBefore(moment("2024-06-12"))
    ? moment().format("ddd, MMMM Do")
    : moment("2024-06-12").format("ddd, MMMM Do"),
  dateFormatted: moment().isBefore(moment("2024-06-12"))
    ? moment().format("YYYYMMDD")
    : moment("2024-06-12").format("YYYYMMDD"),

  todayFormatted: moment().format("YYYYMMDD"),
  dateTimeUTC: new Date().toISOString(),
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    nextDate: (state) => {
      return {
        ...state,
        date: moment(state.date, "ddd, MMMM Do")
          .add(1, "days")
          .format("ddd, MMMM Do"),
        dateFormatted: moment(state.dateFormatted, "YYYYMMDD")
          .add(1, "days")
          .format("YYYYMMDD"),
      };
    },
    prevDate: (state) => {
      return {
        ...state,
        date: moment(state.date, "ddd, MMMM Do")
          .subtract(1, "days")
          .format("ddd, MMMM Do"),
        dateFormatted: moment(state.dateFormatted, "YYYYMMDD")
          .subtract(1, "days")
          .format("YYYYMMDD"),
      };
    },
  },
});

export const { nextDate, prevDate } = dateSlice.actions;
export default dateSlice.reducer;
