import React, { useEffect, useState } from "react";
import { OrderContext } from "vtex.order-placed";

interface IPayment {
  typePayment: string;
  iconPayment: string;
}

interface IIconChangeProps {
  payments: IPayment[];
}

function IconChange({ payments }: IIconChangeProps) {
  const { useOrder } = OrderContext;
  const order = useOrder();
  const paymentData = order.paymentData;

  useEffect(() => {
    const selectedMethod = payments.find(
      (method) =>
        method.typePayment ===
        paymentData.transactions[0].payments[0].paymentSystemName
    );
    if (selectedMethod) {
      setTest(selectedMethod);
    }
  }, []);

  const [test, setTest] = useState<IPayment>({
    iconPayment: "",
    typePayment: ""
  });

  return (
    <div>
      <img src={test.iconPayment} alt={test.typePayment} />
    </div>
  );
}

IconChange.schema = {
  title: "Pagamentos",
  type: "object",
  properties: {
    payments: {
      type: "array",
      title: "Tipos de pagamentos",
      items: {
        type: "object",
        title: "Pagamentos",
        properties: {
          typePayment: {
            type: "string",
            title: "Pagamento"
          },
          iconPayment: {
            title: "Image Payment",
            type: "string",
            widget: {
              "ui:widget": "image-uploader"
            }
          }
        }
      }
    }
  }
};

export default IconChange;
