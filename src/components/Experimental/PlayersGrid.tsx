import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { playerStatsColDef } from "@/utils/experimental/helpers/mappingUtil";
import CircularProgress from "@mui/material/CircularProgress";

export const PlayersGrid = ({
  playerStats,
  isFetchingPlayerStats,
  isError,
}) => {
  const gridRef = useRef(null);

  // useEffect(() => {
  //   handleDataRefresh();
  // }, [playerStats])

  if (isError) {
    return (
      <div className="text-lg text-red-500 font-semibold">
        Request Timed Out.
      </div>
    );
  }

  return (
    <Box sx={{ height: "725px", width: "100%" }}>
      {isFetchingPlayerStats ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={playerStats}
          columns={playerStatsColDef()}
          sx={{ display: "flex", flexDirection: "column-reverse" }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          // checkboxSelection
          disableRowSelectionOnClick
          ref={gridRef}
        />
      )}
    </Box>
  );
};
