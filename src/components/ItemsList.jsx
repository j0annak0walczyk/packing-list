import { useEffect, useState } from "react";
import { Loader } from "./Loader";

const BASE_URL = "http://localhost:9000";

function ItemsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [itemsList, setItemsList] = useState([]);

  useEffect(function () {
    async function fetchItemsList() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/list`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setIsLoading(false);
        console.log(data);
        setItemsList(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchItemsList();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Country:</th>
            <th>City:</th>
            <th>Item:</th>
          </tr>
        </thead>
        <tbody>
          {itemsList.map((item) => (
            <tr key={item.id}>
              <td>{item.country}</td>
              <td>{item.cityName}</td>
              <td>{item.item}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemsList;
