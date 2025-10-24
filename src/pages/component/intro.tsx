
import type { tWeatherData, ProfileType } from "../../../types";
import styles from "../../styles/Home.module.scss";


export default function Intro({ weatherData: weather, profile,  }: { weatherData: tWeatherData, profile: ProfileType[]}) {
  // console.log('weatherData', weather.daily.data[0]);
  // console.log('profile', profile);

  return (
    <>
        {
          profile && profile.map(
            (data) => (
              <section className={`${styles.intro}`} id="intro-text" key={data._id}>
                <div className={`${styles.intro_left}`}>
                  <h1>HELLO! &#128513;</h1>
                  <p >
                    {data.shortBio}
                  </p>
                  {
                    weather && weather.daily ?
                      <p>
                        This is what it feels right now in {data.location}: {weather.daily.data[0].summary}
                      </p>
                      : null
                  }
                </div>
                <div className={`${styles.intro_right}`}>
                  <ul>
                    {
                      Object.entries(data.socialLinks).sort().map(
                        ([key, value], id) => (
                          <li key={id}>
                            <a target="_blank" href={value}>{key[0].toUpperCase() + key.toLowerCase().slice(1)}</a>
                          </li>
                        )
                      )
                    }
                    <li>
                      <a target="_blank" href={data.resumeURL}>Resume</a>
                    </li>
                  </ul>
                </div>
              </section>
            )
          )
        }
    </>
  );
}
