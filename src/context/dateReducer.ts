import moment from "moment";

interface DateState {
  date: string;
  dateFormatted: string;
  todayFormatted: string;
  dateTimeUTC: string;
}

type Action = { type: "next_date" } | { type: "previous_date" };

export default function dateReducer(
  state: DateState,
  action: Action
): DateState {
  switch (action.type) {
    case "next_date": {
      return {
        ...state,
        date: moment(state.date, "ddd, MMMM Do")
          .add(1, "days")
          .format("ddd, MMMM Do"),
        dateFormatted: moment(state.dateFormatted, "YYYYMMDD")
          .add(1, "days")
          .format("YYYYMMDD"),
      };
    }
    case "previous_date": {
      return {
        ...state,
        date: moment(state.date, "ddd, MMMM Do")
          .subtract(1, "days")
          .format("ddd, MMMM Do"),
        dateFormatted: moment(state.dateFormatted, "YYYYMMDD")
          .subtract(1, "days")
          .format("YYYYMMDD"),
      };
    }
    default:
      return state;
  }
}
