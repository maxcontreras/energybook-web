/* eslint-disable */
import modelObject from "@/services/lb-services";
import loopback from "@/services/loopback";

modelObject.setModel("AdminValue");

let adminValue = Object.assign(
  {},
  {
    relation: "",
    get() {
      return loopback.get("/AdminValues");
    },

    findByDate(ISOdate, division) {
      return loopback.post("/AdminValues/findByDate", { date: ISOdate, division });
    },

    createOrUpdatePrices(date, city, payload, tariffType) {
      return loopback.post("/AdminValues/createOrUpdatePrices", {
        date,
        city,
        payload,
        tariffType,
      });
    },
  },
  modelObject
);

export default adminValue;
