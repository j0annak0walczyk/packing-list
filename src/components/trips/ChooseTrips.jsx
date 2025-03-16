/* eslint-disable react/prop-types */
import { Link, useSearchParams } from "react-router-dom";
import { useTripsList } from "../../hooks/useTripsList";
import { Loader } from "../ui/Loader";
import { ChooseTrip } from "./ChooseTrip";
import styles from "./ChooseTrips.module.css";
import ChooseTripsBar from "./ChooseTripsBar";
import { calculateTripDuration } from "../../calculations/calculateTripDuration";
import { Button } from "../ui/Button";

function ChooseTrips() {
  const { data: tripsList, isLoading: isLoadingTrips } = useTripsList();
  const [searchParams] = useSearchParams();

  if (isLoadingTrips) return <Loader />;

  // FILTER

  const filterValue = searchParams.get("duration") || "all";

  let filteredTrips;
  let noTripInformation;
  if (filterValue === "all")
    (filteredTrips = tripsList), (noTripInformation = "There are no trips yet");

  if (filterValue === "daytrips")
    (filteredTrips = tripsList?.filter(
      (trip) => calculateTripDuration(trip.dateFrom, trip.dateTo).days === 1
    )),
      (noTripInformation = "There are no 1 day trips yet");

  if (filterValue === "2-7days")
    (filteredTrips = tripsList?.filter(
      (trip) =>
        calculateTripDuration(trip.dateFrom, trip.dateTo).days > 1 &&
        calculateTripDuration(trip.dateFrom, trip.dateTo).days < 8
    )),
      (noTripInformation = "There are no 2-7 day trips yet");

  if (filterValue === "8-14days")
    (filteredTrips = tripsList?.filter(
      (trip) =>
        calculateTripDuration(trip.dateFrom, trip.dateTo).days > 7 &&
        calculateTripDuration(trip.dateFrom, trip.dateTo).days < 15
    )),
      (noTripInformation = "There are no 8-14 trips yet");

  if (filterValue === "morethan14days")
    (filteredTrips = tripsList?.filter(
      (trip) => calculateTripDuration(trip.dateFrom, trip.dateTo).days >= 15
    )),
      (noTripInformation = "There are no more than 14 day trips trips yet");

  // SORT

  const sortBy = searchParams.get("sortBy") || "country-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  let sortedTrips;
  let var1;
  let var2;
  sortedTrips = filteredTrips?.sort((a, b) => {
    if (field === "city" || field === "country") {
      var1 = a[field].toString().toLowerCase();
      var2 = b[field].toString().toLowerCase();
    } else if (field === "duration") {
      var1 = calculateTripDuration(a.dateFrom, a.dateTo).days;
      var2 = calculateTripDuration(b.dateFrom, b.dateTo).days;
    } else if (field === "createDate") {
      var1 = new Date(a.createDate);
      var2 = new Date(b.createDate);
    }
    if (var1 < var2) {
      return -1 * modifier;
    }
    if (var1 > var2) {
      return 1 * modifier;
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      <ChooseTripsBar />
      <div className={styles.tripsOnPage}>
        Trips on page: <b>{filteredTrips?.length}</b>
      </div>
      {filteredTrips?.length < 1 ? (
        <div className={styles.noTripsInfo}>
          <div>{noTripInformation}</div>
          <Link to="/app/choose-trip/new-trip">
            <Button version={"nav"}>Create new trip</Button>
          </Link>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHead}>Country:</th>
              <th className={styles.tableHead}>City:</th>
              <th className={styles.tableHead}>Date from:</th>
              <th className={styles.tableHead}>Date to:</th>
              <th className={styles.tableHead}>Duration:</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrips?.map((trip) => (
              <ChooseTrip className={styles.list} key={trip.id} trip={trip} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ChooseTrips;
