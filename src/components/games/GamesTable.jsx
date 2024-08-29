import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

//internal import

import Status from "@/components/table/Status";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import MainDrawer from "@/components/drawer/MainDrawer";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import StaffDrawer from "@/components/drawer/StaffDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ActiveInActiveButton from "@/components/table/ActiveInActiveButton";
import DeleteButton from "../table/DeleteButton";
import GameEditDrawer from "../drawer/GameEditDrawer";

const GamesTable = ({ data, lang }) => {
  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
  } = useToggleDrawer();

  const { showDateFormat, showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <GameEditDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {data?.map((Games) => (
          <TableRow key={Games.gameName}>
            <TableCell>
              <span className="text-sm">{Games.gameName}</span>{" "}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={Games.gameName}
                staff={Games}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                title={showingTranslateValue(Games?.gameName)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default GamesTable;
