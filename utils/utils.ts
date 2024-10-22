"use client";

interface Categorie {
  idCategorie: string;
  nameCategorie: string;
  imageCategorie: string;
}
const categories: Categorie[] = [
  {
    idCategorie: "1",
    nameCategorie: "Man",
    imageCategorie: "/images/wolf.jpeg",
  },
  {
    idCategorie: "2",
    nameCategorie: "Woman",
    imageCategorie: "/images/wolf.jpeg",
  },
  {
    idCategorie: "3",
    nameCategorie: "New",
    imageCategorie: "/images/wolf.jpeg",
  },
  {
    idCategorie: "4",
    nameCategorie: "Kids",
    imageCategorie: "/images/wolf.jpeg",
  },
  {
    idCategorie: "5",
    nameCategorie: "Woman",
    imageCategorie: "/images/wolf.jpeg",
  },
  {
    idCategorie: "6",
    nameCategorie: "New",
    imageCategorie: "/images/wolf.jpeg",
  },
  {
    idCategorie: "7",
    nameCategorie: "Kids",
    imageCategorie: "/images/wolf.jpeg",
  },
];

const [currentIndexCategorie, setCurrentIndexCategorie] =
  React.useStateuseState(1);
const visibleCategories = categories.slice(
  currentIndexCategorie,
  currentIndexCategorie + 4,
);
const handleNext = () => {
  setCurrentIndexCategorie((prevIndex) =>
    prevIndex + 4 >= categories.length ? 0 : prevIndex + 4,
  );
};

const handlePrev = () => {
  setCurrentIndexCategorie((prevIndex) =>
    prevIndex - 4 < 0
      ? categories.length - (categories.length % 4)
      : prevIndex - 4,
  );
};
