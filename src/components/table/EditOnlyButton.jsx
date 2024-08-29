import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";
import { FaBan } from "react-icons/fa";

import Tooltip from "@/components/tooltip/Tooltip";

const EditOnlyButton = ({
  id,
  title,
  handleUpdate,
  handleModalOpen,
  isCheck,
  product,
  parent,
  children,
}) => {
  const { t } = useTranslation();
  // console.log('edite delet button')
  return (
    <>
      <div className="flex justify-end text-right">
        <button
          disabled={isCheck?.length > 0}
          onClick={() => handleUpdate(id)}
          className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
        >
          <Tooltip id="edit" Icon={FaBan} title={t("Ban")} bgColor="#10B981" />
        </button>
      </div>
    </>
  );
};

export default EditOnlyButton;
