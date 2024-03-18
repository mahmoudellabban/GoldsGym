import React, { useState, useEffect } from "react";
import { exercisesOptions, fetchData } from "../../utils/fetchData";
import "./Exercises.css";
const Exercises = () => {
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exercisesOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExercisesData()
  },[]);
  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exercisesOptions
      );
      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      setSearch("");
      setExercises(searchedExercises);
    }
  };
  return (
    <section className="container" id="exercises">
      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search here..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="parts">
        {bodyParts.map((item) => (
          <div key={item.id || item} className="part">
            {item}
          </div>
        ))}
      </div>
      <div className="wrapper">
        <div className="card">exercise card</div>
      </div>
    </section>
  );
};

export default Exercises;
