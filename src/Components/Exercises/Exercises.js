import React, { useState, useEffect } from "react";
import { exercisesOptions, fetchData } from "../../utils/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Exercises.css";

const Exercises = () => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const bodyPartsData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exercisesOptions
        );
        setBodyParts(["all", ...bodyPartsData]);

        const exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exercisesOptions
        );
        setAllExercises(exercisesData);
        setFilteredExercises(exercisesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleSearch = () => {
    const searchedExercises = allExercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(search) ||
        exercise.target.toLowerCase().includes(search) ||
        exercise.equipment.toLowerCase().includes(search) ||
        exercise.bodyPart.toLowerCase().includes(search)
    );

    setFilteredExercises(searchedExercises);
  };

  const handleBodyPartClick = (bodyPart) => {
    const filteredExercises = bodyPart === "all" ? allExercises : allExercises.filter(
      (exercise) => exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
    );
    setFilteredExercises(filteredExercises);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container" id="exercises">
      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          onKeyDown={handleSearch}
          type="text"
          placeholder="Search here..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          550: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 5,
          },
        }}
        className="parts"
      >
        {bodyParts.map((item) => (
          <SwiperSlide
            key={item}
            className="part"
            onClick={() => handleBodyPartClick(item)}
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="cards-wrapper">
        {filteredExercises.length > 3 ? (
          filteredExercises.map((exercise) => (
            <div key={exercise.id} className="card">
              <div className="gif">
                <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
              </div>
              <div className="info">
                <h3>{exercise.name}</h3>
                <p>
                  <strong>Body Part:</strong> {exercise.bodyPart}
                </p>
                <p>
                  <strong>Target Muscles:</strong> {exercise.target}
                </p>
                <p>
                  <strong>Secondary Muscles:</strong>{" "}
                  {exercise.secondaryMuscles.join(", ")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No results found for now!</div>
        )}
      </div>
    </section>
  );
};

export default Exercises;
