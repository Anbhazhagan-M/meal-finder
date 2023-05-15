import { useQueries } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getSingleMeal } from "./meals/[id]";
import classes from "./savedMeals.module.scss";
import Title from "../../components/text/Title";
import Text from "../../components/text/Text";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import PointText from "../../components/text/PointText";
import Image from "next/image";

function SavedMeals(props) {
  const [savedMealsId, setSavedMealsId] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("savedMeals")) {
      setSavedMealsId(JSON.parse(localStorage.getItem("savedMeals")));
    }
  }, []);

  const queries = savedMealsId.map((id) => ({
    queryKey: ["singleMeal", id],
    queryFn: getSingleMeal,
  }));
  const result = useQueries({ queries });
  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>
        My Saved Meal List
      </Title>
      <div className={classes.list_container}>
        {savedMealsId.length <= 0 && <Text>You have no saved meals</Text>}
        {result &&
          result.map(({ data, isLoading }, index) => {
            if (isLoading) {
              return (
                <BeatLoader color="#fff" key={savedMealsId[index]}></BeatLoader>
              );
            }
            return (
              <Link
                href={`/meals/${data.idMeal}`}
                key={data.idMeal}
                className={classes.singleMeal}
              >
                <div className={classes.img}>
                  <Image
                    src={data.strMealThumb}
                    height={250}
                    width={250}
                  ></Image>
                </div>
                <Title variant="secondary" className={classes.mealTitle}>
                  {data.strMeal}
                </Title>
                <PointText>Category: {data.strCategory}</PointText>
                <PointText>Area: {data.strArea}</PointText>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default SavedMeals;
