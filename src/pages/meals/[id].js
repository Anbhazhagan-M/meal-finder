import React, { useEffect, useState } from "react";
import classes from "./meals.module.scss";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Text from "../../../components/text/Text";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import Title from "../../../components/text/Title";
import PointText from "../../../components/text/PointText";
import IngredientsTable from "../../../components/mealsPage/IngredientsTable";
import { Button } from "../../../components/buttons/Button";
import { toast } from "react-hot-toast";
import { FaHeart, FaHeartBroken } from "react-icons/fa";


export const getSingleMeal = async ({ queryKey }) => {
  const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals?.[0];
};

function SingleMealPage() {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, error } = useQuery(
    ["singleMeal", id],
    getSingleMeal
  );

  useEffect(() => {
    if (localStorage.getItem("savedMeals")) {
      const savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
      if (savedMeals.includes(id)) {
        setIsSaved(true);
      }
    } else {
      setIsSaved(false);
    }
  }, [id]);

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  if (isLoading || !data) {
    return <BeatLoader color="#fff"></BeatLoader>;
  }

  const ingredients = Object.keys(data)
    .filter((key) => key.startsWith("strIngredient"))
    .filter((key) => data[key] !== "" && data[key] !== null);
  const ingredientsWithMeasures = ingredients.map((key, index) => ({
    index: index + 1,
    ingredient: data[key],
    measure: data[`strMeasure${index + 1}`],
  }));

  const handleSaveButtonClick = () => {
    if (localStorage.getItem("savedMeals") === null) {
      localStorage.setItem("savedMeals", JSON.stringify([data.idMeal]));
      toast.success("Meal Saved Successfully");
      setIsSaved(true);
    } else {
      const savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
      if (!isSaved) {
        savedMeals.push(data.idMeal);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        toast.success("Meal Saved Successfully");
        setIsSaved(true);
      } else {
        savedMeals.splice(savedMeals.indexOf(data.idMeal), 1);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        setIsSaved(false);
        toast.error("Meals Removed Successfully");
      }
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.topContainer}>
        <div className={classes.img}>
          <Image src={data.strMealThumb} height={300} width={300}></Image>
        </div>
        <div className={classes.info}>
          <Title variant={"primary"}>{data.strMeal}</Title>
          <PointText className={classes.infoText}>
            Category: {data.strCategory}
          </PointText>
          <PointText className={classes.infoText}>
            Area: {data.strArea}
          </PointText>
          <PointText className={classes.infoText}>
            Tags: {data?.strTags?.split(",").join(", ")}
          </PointText>
          {isSaved && (
            <Text className={classes.greenText}>You already saved the meal.</Text>
          )}
          <Button
            variant="primary"
            className={classes.saveButton}
            onClick={handleSaveButtonClick}
          >
            {isSaved ? (
              <>
                <FaHeartBroken className={classes.saveIcon}></FaHeartBroken>
                {' '}
                Remove
              </>
            ) : (
              <>
                <FaHeart className={classes.saveIcon}></FaHeart>
                {' '}
                Save
              </>
            )}
          </Button>
        </div>
      </div>
      <div className={classes.ingredientsTable}>
        <IngredientsTable
          ingredientsWithMeasures={ingredientsWithMeasures}
        ></IngredientsTable>
      </div>
      <div className={classes.instructions}>
        <Title>Instructions</Title>
        
        {data.strInstructions
          .split(".")
          .filter((sentence) => sentence !== "")
          .map((sentence) => (
            <PointText key={sentence}>{sentence}.</PointText>
          ))}
      </div>
    </div>
  );
}

export default SingleMealPage;
