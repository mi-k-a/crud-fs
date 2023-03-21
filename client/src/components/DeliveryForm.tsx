import { Button, Select, TextInput } from "@mantine/core";
import { FormikProps } from "formik";
import { Delivery } from "../types/types";

export const DeliveryForm = ({ formik }: { formik: FormikProps<Delivery> }) => {
  enum StatusOptions {
    DELIVERED = "Delivered",
    PAID = "Paid",
    PAYMENT_OPEN = "Payment Open",
  }

  const statusOptions = [
    {
      value: StatusOptions.DELIVERED,
      label: StatusOptions.DELIVERED,
    },
    {
      value: StatusOptions.PAID,
      label: StatusOptions.PAID,
    },
    {
      value: StatusOptions.PAYMENT_OPEN,
      label: StatusOptions.PAYMENT_OPEN,
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        name="orderNumber"
        label="Order Number"
        onChange={formik.handleChange}
        value={formik.values.orderNumber}
        error={formik.touched.orderNumber && formik.errors.orderNumber}
      />
      <Select
        label="Status"
        name="status"
        placeholder="Pick your desired status"
        onChange={(value) => {
          formik.setFieldValue("status", value);
        }}
        value={formik.values.status}
        error={formik.touched.status && formik.errors.status}
        data={statusOptions.map((elm) => ({
          value: elm.value,
          label: elm.label,
        }))}
      />
      <Button variant="light" mt={5} type="submit" color="teal">
        submit
      </Button>{" "}
    </form>
  );
};
