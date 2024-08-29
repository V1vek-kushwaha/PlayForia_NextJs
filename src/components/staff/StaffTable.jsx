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
import EditOnlyButton from "../table/EditOnlyButton";
import UserRestrictDrawer from "../drawer/UserRestrictDrawer";

const StaffTable = ({ staffs, lang }) => {
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
        <StaffDrawer id={serviceId} />

        {/* <UserRestrictDrawer id={serviceId} /> */}
      </MainDrawer>

      <TableBody>
        {staffs?.map((staff) => (
          <TableRow key={staff._id}>
            {/* <TableCell>
              <div className="flex items-center">
                
                <div>
                  <h2 className="text-sm font-medium">
                    {showingTranslateValue(staff?.name)}
                  </h2>
                </div>
              </div>
            </TableCell> */}
            <TableCell>
              <span className="text-sm">{staff.name}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm">{staff.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{staff.phone}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">{staff.dob}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">{staff.usertype}</span>
            </TableCell>

            {/* <TableCell>
              <span className="text-sm">
                {dayjs(staff.createdAt).format("DD/MM/YYYY")}
                {showDateFormat(staff.joiningData)}
              </span>
            </TableCell> */}
            {/* <TableCell>
              <span className="text-sm font-semibold">{staff?.data}</span>
            </TableCell> */}
            <TableCell className="text-center text-xs">
              <Status status={staff.status} />
            </TableCell>
            {/* 
            <TableCell className="text-center">
              <ActiveInActiveButton
                id={staff?._id}
                staff={staff}
                option="staff"
                status={staff.is_verified}
              />
            </TableCell> */}
            {/* <TableCell>
              <EditOnlyButton
                id={staff._id}
                staff={staff}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                title={showingTranslateValue(staff?.name)}
              />
            </TableCell> */}

            <TableCell>
              <EditDeleteButton
                id={staff._id}
                // staff={staff}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                title={showingTranslateValue(staff?.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;
