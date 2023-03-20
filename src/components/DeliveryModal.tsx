import { Modal } from "@mantine/core";
import { ReactElement, useContext } from "react";
import { FormikProps } from "formik";
import { Delivery } from "../types/types";
import { DeliveryStateContext } from "../App";

export const DeliveryModal = ({
  formik,
  children,
}: {
  formik: FormikProps<Delivery>;
  children: ReactElement;
}) => {
  const { isOpened, setIsOpened, isEdit, setIsEdit } =
    useContext<any>(DeliveryStateContext);

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
          setIsEdit(false);
          formik.resetForm();
        }}
        title={isEdit ? "Edit Delivery" : "Create New Delivery"}
      >
        {children}
      </Modal>
    </>
  );
};
