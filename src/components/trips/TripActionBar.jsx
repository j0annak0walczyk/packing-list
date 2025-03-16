/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { EditTripForm } from "./EditTripForm";
import { HiOutlineInformationCircle, HiOutlineTrash } from "react-icons/hi2";
import AddItemsToOtherTrip from "./AddItemsToOtherTrip";
import { useState } from "react";
import useDeleteItem from "../../hooks/useDeleteItem";
import { useItemsList } from "../../hooks/useItemsList";
import { useAddItem } from "../../hooks/useAddItem";
import useDeleteTrip from "../../hooks/useDeleteTrip";
import styles from "./TripActionBar.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from "react-hot-toast";

function TripActionBar({ trip }) {
  const { deleteTrip, isDeletingTrip } = useDeleteTrip(() =>
    alert("coś schrzaniłeś")
  );
  const { addNewItem } = useAddItem();
  const { data: itemsList, refetch: refetchItemsList } = useItemsList();
  const { deleteItem } = useDeleteItem();
  const [selectedTrip, setSelectedTrip] = useState("");

  const [openEditTripForm, setOpenEditTripForm] = useState(false);

  async function handleDeleteTrip() {
    const deletePromises = itemsList
      .filter((item) => item.trip === trip.id)
      .map((item) => deleteItem(item.id));

    Promise.all(deletePromises)
      .then(() => deleteTrip(trip.id))
      .then(() => {
        toast.success("Jupi usunąłęś to co trzeba i pokazeuje jeden toast");
        refetchItemsList();
      });

    console.log(123); // ważna zmiana
  }

  function handleAddListToOtherList() {
    itemsList.map((item) => {
      if (item.trip === trip.id)
        addNewItem({
          checked: false,
          item: item.item,
          quantity: item.quantity,
          note: item.note,
          trip: selectedTrip.value,
        });
    });
  }

  function handleOpenEditTripForm() {
    setOpenEditTripForm(true);
  }

  const handleCloseEditTripForm = (isClosed) => {
    setOpenEditTripForm(isClosed);
  };
  return (
    <div className={styles.container}>
      <div className={styles.tripDetailsContainer}>
        <div>
          <span className={styles.tripDetailsTop}>
            <p>Country:</p> <p>{trip.country}</p>
          </span>
          <span>
            <p>City:</p> <p>{trip.city}</p>
          </span>
        </div>
        <div>
          <span className={styles.tripDetailsTop}>
            <p>Date from:</p> <p>{trip.dateFrom}</p>
          </span>
          <span>
            <p>Date to:</p>
            <p>{trip.dateTo}</p>
          </span>
        </div>
      </div>

      <div className={styles.tripsButtonsContainer}>
        <div className={styles.tripBasicButtonsContainer}>
          <div>
            <Button version={"gray"} onClickFunction={handleOpenEditTripForm}>
              Edit trip
            </Button>
            {openEditTripForm && (
              <EditTripForm
                isOpen={openEditTripForm}
                handleCloseModal={handleCloseEditTripForm}
                trip={trip}
              />
            )}
          </div>
          <div>
            <Link to={`/app/${trip.id}`}>
              <Button version={"information"}>See packing list</Button>
            </Link>
          </div>
          <div>
            <Button
              version={"negative"}
              style={{ fontSize: "28px" }}
              onClickFunction={handleDeleteTrip}
              isDisabled={isDeletingTrip}
            >
              <HiOutlineTrash />
            </Button>
          </div>
        </div>

        <div>
          <div className={styles.add} version={"positive"}>
            <p>You can add items from this trip to other trip</p>
            <div className={styles.selectLine}>
              <AddItemsToOtherTrip setSelectedTrip={setSelectedTrip} />

              <div>
                <div>
                  <p
                    data-tooltip-id="my-tooltip-1"
                    data-tooltip-content='Same sorting applies as on "Choose trip" page'
                  >
                    <HiOutlineInformationCircle />
                  </p>
                </div>
                <ReactTooltip
                  id="my-tooltip-1"
                  className={styles.tooltip}
                  place="top"
                />
              </div>
            </div>
            <Button
              onClickFunction={handleAddListToOtherList}
              style={{
                width: "10rem",
                height: "1.5rem",
                marginLeft: "0px",
                padding: "0.1rem",
              }}
              version={"positive"}
            >
              Add items to other trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripActionBar;
