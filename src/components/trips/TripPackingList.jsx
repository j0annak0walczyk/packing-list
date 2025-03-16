import { useParams, useSearchParams } from "react-router-dom";
import styles from "./TripPackingList.module.css";
import { Loader } from "../ui/Loader";
import { useTripsList } from "../../hooks/useTripsList";
import { calculateTripDuration } from "../../calculations/calculateTripDuration";
import { useItemsTripList } from "../../hooks/useItemsTripList";
import Item from "../items/Item";
import { Button } from "../ui/Button";
import { useState } from "react";
import AddItem from "../items/AddItem";
import { Filter } from "../ui/Filter";
import { Sort } from "../ui/Sort";

export default function TripPackingList() {
  const {
    data: itemsList,
    isLoading: isLoadingItems,
    // error: errorItems,
    refetch: refetchItemsList,
  } = useItemsTripList();
  const {
    data: tripsList,
    isLoading: isLoadingTrips,
    // error: errorTrips,
  } = useTripsList();
  const [openAddItemForm, setOpenAddItemForm] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  if (isLoadingItems || isLoadingTrips) {
    return <Loader />;
  }

  if (!itemsList || !tripsList) {
    return <div>Loading data...</div>;
  }

  const tripDetails = tripsList.filter((trip) => trip.id === Number(id));

  if (!tripDetails || tripDetails.length === 0) {
    return <div>Trip not found</div>;
  }

  const duration = calculateTripDuration(
    tripDetails[0]?.dateFrom,
    tripDetails[0]?.dateTo
  ).days;

  function handleOpenAddItemForm() {
    setOpenAddItemForm(true);
  }

  const handleCloseAddItemForm = (isClosed) => {
    setOpenAddItemForm(isClosed);
    refetchItemsList();
  };

  const filterValue = searchParams.get("checked") || "all";

  let filteredPackingList;
  let noItemInformation;
  if (filterValue === "all")
    (filteredPackingList = itemsList),
      (noItemInformation = "There are no items yet");
  if (filterValue === "true")
    (filteredPackingList = itemsList?.filter((item) => item.checked)),
      (noItemInformation = "There are no checked items yet");
  if (filterValue === "false")
    (filteredPackingList = itemsList?.filter((item) => !item.checked)),
      (noItemInformation = "There are no unchecked items");

  const sortBy = searchParams.get("sortBy") || "item-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  let sortedItems;
  let var1;
  let var2;
  sortedItems = filteredPackingList?.sort((a, b) => {
    if (field === "item") {
      var1 = a[field].toString().toLowerCase();
      var2 = b[field].toString().toLowerCase();
    }
    if (var1 < var2) {
      return -1 * modifier;
    }
    if (var1 > var2) {
      return 1 * modifier;
    }
    return 0;
  });

  const { country, city, dateFrom, dateTo } = tripDetails[0];

  const sortOptions = [
    { value: "item-asc", label: "Item (A-Z)" },
    { value: "item-desc", label: "Item (Z-A)" },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "true", label: "Checked" },
    { value: "false", label: "Unchecked" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsNames}>
          <span>Country: {country}</span>
          <span>City: {city}</span>
        </div>
        <div className={styles.detailsDates}>
          <span>Date from: {dateFrom}</span>
          <span>Date to: {dateTo}</span>
        </div>
        <div className={styles.detailsDuration}>
          <span>
            Duration: {duration} {duration === 1 ? "day" : "days"}
          </span>
        </div>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.sortAndFilter}>
          <Sort options={sortOptions} />
          <Filter
            filterField="checked"
            options={filterOptions}
            refetch={refetchItemsList}
          />
          <div className={styles.addItem}>
            <Button
              version={"addButton"}
              onClickFunction={handleOpenAddItemForm}
            >
              Add item
            </Button>
            {openAddItemForm && (
              <AddItem
                isOpen={openAddItemForm}
                handleCloseModal={handleCloseAddItemForm}
                tripDetails={tripDetails}
              />
            )}
          </div>
        </div>
        {sortedItems < 1 ? (
          <div className={styles.noItemsInfo}>
            <div>{noItemInformation}</div>
            <Button
              version={"addButton"}
              onClickFunction={handleOpenAddItemForm}
            >
              Add item
            </Button>
          </div>
        ) : (
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>Packed:</th>
                <th>Item:</th>
                <th>Quantity:</th>
                <th>Note:</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item) => (
                <Item item={item} key={item.id} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
