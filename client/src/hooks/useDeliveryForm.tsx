import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { Delivery } from "../types/types";
import axios from "axios";

export const useDeliveryForm = ({
  isEdit,
  setIsEdit,
  setIsOpened,
  deliveries,
  setDeliveries,
}: {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  deliveries: Delivery[];
  setDeliveries: React.Dispatch<Delivery[]>;
}) => {
  const formik = useFormik<Delivery>({
    initialValues: {
      _id: "",
      orderNumber: "",
      status: "",
    },
    validationSchema: Yup.object({
      orderNumber: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      if (!isEdit) {
        if (deliveries) {
          const newDelivery = {
            id: uuidv4(),
            orderNumber: values.orderNumber,
            status: values.status,
          };

          await axios.post("http://localhost:3004/deliveries", newDelivery);
        } else {
          localStorage.setItem("deliveries", JSON.stringify([values]));
          setDeliveries([values]);
        }
      }

      if (isEdit) {
        const updatedDelivery = {
          _id: values._id,
          orderNumber: values.orderNumber,
          status: values.status,
        };

        await axios.patch(
          `http://localhost:3004/deliveries/${updatedDelivery._id}`,
          updatedDelivery
        );
      }

      formik.resetForm();
      setIsEdit(false);
      setIsOpened(false);
    },
  });
  return formik;
};
