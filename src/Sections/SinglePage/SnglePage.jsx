import { useState, useEffect } from "react";
import React from "react";
import styles from "./SinglePage.module.scss";
import { useNavigate, useParams } from "react-router-dom";

import goBackImg from "../../assets/call-made.png";

const SnglePage = ({isLight}) => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(useParams());

  const nav = useNavigate()

  const goBack = () =>{
    nav(-1)
  }

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://restcountries.com/v3.1/name/${name}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError("404 not found thex page");
        setLoading(false);
      }
    };
    fetchApi();
  }, [name]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (

    <div className={isLight ? `${styles.main_true}` : `${styles.main_false}`}>
    <div className={styles.singlePage_Container}>
      <div className={styles.back_Container}
      onClick={goBack}>
        <button className={styles.back_btn}>
          <img className={styles.goBackImg} src={goBackImg} alt="Go Back" />
          <span>Back</span>
        </button>
      </div>
      <div className={styles.singlePage_Content}>
        <div className={styles.flag_Container}>
          <img className={styles.flag_Img} src={country.flags.png} alt="flag" />
        </div>
        <div className={styles.country_Info_Container}>
          <div className={styles.country_Info_Content}>
          <h1>{country.name.common}</h1>
          <p>Native Name:{country.altSpellings[1]}</p>
          <p>Population: {country.population}</p>
          <p>Region:{country.region}</p>
          <p>Sub Region:{country.subregion}</p>
          <p>Capital:{country.capital}</p>
        </div>
        </div>
        <div className={styles.country_Info_Content2}>
          <p>Top Level Domain:<span>
            {country.tld.join(", ")}
            </span></p>
          <p>Currencies:<span>{Object.values(country.currencies).map(curr => curr.name).join(", ")}</span></p>
      
          <p>Languages:<span>{Object.values(country.languages).join (", ")}</span></p>
        </div>
      </div>
        <div className={styles.border_Countries}>
          <p>Border Countries:
            <span>
              {country.borders ? country.borders.join(", ") :"none"}
            </span>
          </p>
        </div>
    </div>
    </div>
  );
};

export default SnglePage;
