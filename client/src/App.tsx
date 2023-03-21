import { Button, Container, Flex, Text, Image } from "@mantine/core";
import { useState, createContext, useEffect } from "react";
import { DeliveryModal } from "./components/DeliveryModal";
import { DeliveriesTable } from "./components/DeliveriesTable";
import { useDeliveryForm } from "./hooks/useDeliveryForm";
import { DeliveryForm } from "./components/DeliveryForm";
import { Delivery, DeliveryContextValues } from "./types/types";
import axios from "axios";

export const DeliveryStateContext = createContext<DeliveryContextValues>({
  isOpened: false,
  setIsOpened: () => {},
  isEdit: false,
  setIsEdit: () => {},
  deliveries: [],
  setDeliveries: () => {},
});

function App() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>(
    JSON.parse(localStorage.getItem("deliveries") || "[]")
  );

  useEffect(() => {
    getDeliveries();
  }, [deliveries, setDeliveries]);

  const getDeliveries = async () => {
    const { data } = await axios.get("http://localhost:3004/deliveries");
    setDeliveries(data);
  };

  const formik = useDeliveryForm({
    isEdit,
    setIsEdit,
    setIsOpened,
    deliveries,
    setDeliveries,
  });

  const globalState: DeliveryContextValues = {
    isOpened,
    setIsOpened,
    isEdit,
    setIsEdit,
    deliveries,
    setDeliveries,
  };

  return (
    <DeliveryStateContext.Provider value={globalState}>
      <Container size="sm">
        <Flex gap="md" align="center" direction="column">
          <Image
            sx={{ filter: "invert(.8)" }}
            pt={50}
            width={100}
            height="auto"
            src="https://www.shareicon.net/data/128x128/2016/10/25/847244_delivery_512x512.png"
          />

          <Text fz={30} align="center">
            Deliveries
          </Text>

          <Button
            color="teal"
            variant="light"
            onClick={() => setIsOpened(true)}
          >
            Add New Delivery
          </Button>

          <DeliveryModal formik={formik}>
            <DeliveryForm formik={formik} />
          </DeliveryModal>

          {deliveries.length > 0 ? (
            <DeliveriesTable formik={formik} />
          ) : (
            <Text> No deliveries yet</Text>
          )}
        </Flex>
      </Container>
    </DeliveryStateContext.Provider>
  );
}

export default App;
