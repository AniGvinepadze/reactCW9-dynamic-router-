import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Main.module.scss";

const MainPage = ({ isLight, setIsLight }) => {
  // const [isLight, setIsLight] = useState(false);
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limitedData, setLimitedData] = useState([]);

  // const lightMode = () => {
  //   setIsLight((prev) => (prev = !isLight));
  // };

  useEffect(() => {
    const fetchApi = async () => {
      const url = "https://restcountries.com/v3.1/all";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const limitedCountry = data.slice(0, 8);
        console.log(limitedCountry);
        setLimitedData(limitedCountry);
        setLoading(false);
      } catch (err) {
        setError("404 not found the page");
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className={isLight ? `${style.main_true}` : `${style.main_false}`}>
      <div className={style.main_Container}>
        <div className={style.main_Content}>
          {loading ? (
            <h2>Loading ... </h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <div className={style.card_Container}>
              {limitedData.map((country) => (
                <Link
                  key={country.cca3}
                  to={`/posts/${country.cca3}/${country.name.common}`}
                  style={{ textDecoration: "none", color: "#111517" }}
                >
                  <div
                    key={country.id}
                    className={isLight ? `${style.card_Content_isDark}` : `${style.card_Content_isLight}`}
                  >
                    <div key={country.id} className={style.img_Container}>
                      <img
                        className={style.img}
                        src={country.flags.png}
                        alt="flag"
                      />
                    </div>
                    <div className={style.cardContainer_info}>
                      <h2 className={style.cardContainer_info_H2}>
                        {" "}
                        {country.name.common}{" "}
                      </h2>
                      <div className={style.cardContent_info}>
                        <p className={style.p}>
                          Population: <span>{country.population}</span>
                        </p>
                        <p className={style.p}>
                          Region: <span>{country.region}</span>
                        </p>
                        <p className={style.p}>
                          Capital: <span>{country.capital}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
