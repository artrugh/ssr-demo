import React from "react";
import fetch from "cross-fetch";

const fetchData = async (breed: string) =>
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((res) => res.json())
    .then((data) => {
      return data.message;
    });

const Breed = ({
  initialBreed = "",
  initialImage = "",
}: {
  initialBreed?: string;
  initialImage?: string;
}) => {
  const [breed, setBreed] = React.useState<string>(initialBreed);
  const [image, setImage] = React.useState<string>(initialImage);

  React.useEffect(() => {
    // Only for educational reason. Keep CSR working
    if (!breed) {
      const params = new URLSearchParams(window.location.search);
      const breedFromParams = params.get("b");
      if (breedFromParams) {
        setBreed(breedFromParams);
        fetchData(breedFromParams).then(setImage);
      }
    }
  }, [breed]);

  return (
    <div>
      <a href="/breeds">Go back</a>
      <h1>{breed}</h1>
      <img src={image} alt={breed || ""} />
    </div>
  );
};

export default Breed;

export const gSSP = async ({ query }: any) => {
  return {
    initialBreed: query.b,
    initialImage: await fetchData(query.b),
  };
};
