import type { Scheduledata } from "@/utils/types/index";

export const getDailyGames = (data: Scheduledata[], dateFormatted: string) => {
  const schedule = data.find((i) => {
    const date = new Date(i.gameDate);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const formattedDate = `${year}${month}${day}`;

    return formattedDate === dateFormatted;
  });

  return schedule;
};
