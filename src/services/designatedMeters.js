/* eslint-disable */
import loopback from "@/services/loopback";
import modelObject from "@/services/lb-services";

modelObject.setModel("DesignatedMeters");

let designatedMeters = Object.assign(
  {},
  {
    relation: "",
    get() {
      return loopback.get("/DesignatedMeters");
    },
    getWeather(lat, lon) {
      return loopback.post("DesignatedMeters/getWeather", { lat, lon });
    },

    getGeneration(company_id, service_name, device_name) {
      return loopback.get("DesignatedMeters/generation", {
        params: {
          company_id,
          service_name,
          device_name
        }
      });
    },

    getCarbonFootprint(company_id, service_name) {
      return loopback.get("DesignatedMeters/carbonFootprint", {
        params: {
          company_id,
          service_name
        }
      });
    },

    epimpHistory(company_id) {
      return loopback.post("DesignatedMeters/epimpHistory", { company_id });
    },

    odometerReadings(company_id) {
      return loopback.post("DesignatedMeters/odometerReadings", { company_id });
    },

    consumptionSummary(company_id) {
      return loopback.post("DesignatedMeters/consumptionSummary", {
        company_id
      });
    },

    dailyReadings(company_id) {
      return loopback.post("DesignatedMeters/dailyReadings", { company_id });
    },

    fpReadings(company_id) {
      return loopback.post("DesignatedMeters/fpReadings", { company_id });
    },

    monthlyReadings(company_id) {
      return loopback.post("DesignatedMeters/monthlyReadings", { company_id });
    },

    setDeviceDescriptions() {
      return loopback.post("DesignatedMeters/setDeviceDescriptions");
    },

    deleteMeterWithServices(meterId) {
      return loopback.post("DesignatedMeters/deleteMeterWithServices", {
        meterId
      });
    },
    PATCH(meterId,data){
      return loopback.patch(`/DesignatedMeters/${meterId}`, data);
      
    }
    
  },
  modelObject
);

export default designatedMeters;
