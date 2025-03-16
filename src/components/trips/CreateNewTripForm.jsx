/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../ui/Button";
import styles from "./CreateNewTripForm.module.css";
import { useCreateTrip } from "../../hooks/useCreateTrip";
import toast from "react-hot-toast";

export const CreateNewTripForm = ({
  countryData = "",
  cityData = "",
  setIsOpenModalFromChild = () => {},
  style,
}) => {
  const { createTrip, isCreatingTrip } = useCreateTrip();

  const [country, setCountry] = useState(countryData);
  const [city, setCity] = useState(cityData);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function clearForm() {
    setCountry("");
    setCity("");
    setDateFrom("");
    setDateTo("");
  }

  const createNewTrip = function (e) {
    e.preventDefault();

    const createDate = new Date();

    if (dateFrom > dateTo) {
      toast.error("End date cannot be greater than start date");
    }

    if (
      country &&
      city &&
      dateFrom &&
      dateTo &&
      createDate &&
      dateFrom <= dateTo
    ) {
      const newTrip = {
        createDate: createDate,
        city: city,
        country: country,
        dateFrom: dateFrom,
        dateTo: dateTo,
      };

      createTrip(newTrip);
      clearForm();
      setIsOpenModalFromChild(false);
    } else if (!country || !city || !dateFrom || !dateTo) {
      toast.error("Fill in all fields");
    }
  };

  return (
    <div className={style ? style.formPopupContainer : styles.formContainer}>
      <form className={styles[style] || styles.form}>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className={styles.inputDateContainer}>
          <label className={styles.placeholder} id="placeholder">
            From:
          </label>
          <input
            className={styles.inputDate}
            type="date"
            placeholder="Date from"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <label className={styles.placeholder} id="placeholder">
            To:
          </label>
          <input
            className={styles.inputDate}
            type="date"
            placeholder="Date to"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        <Button onClickFunction={createNewTrip} isdisabled={isCreatingTrip}>
          Create trip
        </Button>
      </form>
    </div>
  );
};
