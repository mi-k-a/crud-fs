import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { Delivery } from "../types/types";

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
      id: "",
      orderNumber: "",
      status: "",
    },
    validationSchema: Yup.object({
      orderNumber: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      // "API"
      if (!isEdit) {
        if (deliveries) {
          const addNewDelivery = [
            ...deliveries,
            {
              id: uuidv4(),
              orderNumber: values.orderNumber,
              status: values.status,
            },
          ];

          setDeliveries(addNewDelivery);
          localStorage.setItem("deliveries", JSON.stringify(addNewDelivery));
        } else {
          localStorage.setItem("deliveries", JSON.stringify([values]));
          setDeliveries([values]);
        }
      }

      if (isEdit) {
        const updatedDelivery = deliveries?.map((delivery: Delivery) =>
          delivery.id === values.id
            ? {
                ...delivery,
                orderNumber: values.orderNumber,
                status: values.status,
              }
            : delivery
        );
        localStorage.setItem("deliveries", JSON.stringify(updatedDelivery));
        setDeliveries(updatedDelivery);
      }

      formik.resetForm();
      setIsEdit(false);
      setIsOpened(false);
    },
  });
  return formik;
};
