import { Button, Flex, Table } from "@mantine/core";
import { useContext } from "react";
import { Delivery } from "../types/types";
import { FormikProps } from "formik";
import { DeliveryStateContext } from "../App";

export const DeliveriesTable = ({
  formik,
}: {
  formik: FormikProps<Delivery>;
}) => {
  const { setIsOpened, setIsEdit, deliveries, setDeliveries } =
    useContext(DeliveryStateContext);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Status</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {deliveries?.map((delivery: Delivery) => (
          <tr key={delivery.id}>
            <td width={250}>{delivery.orderNumber}</td>
            <td>{delivery.status}</td>
            <td width={150}>
              <Flex justify="flex-end">
                <Button
                  onClick={() => {
                    setIsEdit(true);
                    setIsOpened(true);

                    // prepopulate edit form with values
                    formik.setValues({
                      id: delivery.id,
                      orderNumber: delivery.orderNumber,
                      status: delivery.status,
                    });
                  }}
                  variant="light"
                  size="xs"
                  mr={5}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    const filteredDeliveriesArr = deliveries.filter(
                      (elm: Delivery) => elm.id !== delivery.id
                    );

                    localStorage.setItem(
                      "deliveries",
                      JSON.stringify(filteredDeliveriesArr)
                    );
                    setDeliveries(filteredDeliveriesArr);
                  }}
                  color="red"
                  variant="light"
                  size="xs"
                >
                  Delete
                </Button>
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
