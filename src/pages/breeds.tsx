import React from "react";
import fetch from "cross-fetch";

const fetchData = async () =>
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((data) => {
      return Object.keys(data.message);
    });

const Breeds = ({ initialBreeds = [] }: { initialBreeds?: string[] }) => {
  const [breeds, setBreeds] = React.useState<string[]>(initialBreeds);
  // Only for educational reason. Keep CSR working
  React.useEffect(() => {
    if (!breeds.length) {
      fetchData().then(setBreeds);
    }
  }, [breeds]);

  return (
    <div>
      <ul>
        {breeds?.map((breed) => {
          return (
            <li key={breed}>
              <a href={`breed?b=${breed}`}>{breed}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breeds;

export const gSSP = async () => {
  return {
    initialBreeds: await fetchData(),
  };
};
