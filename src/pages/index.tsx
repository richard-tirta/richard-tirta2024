
import { getProfile, getWorks } from "../../sanity/sanity.query";
import type { tWeatherData, ProfileType, WorksType } from "../../types";

import styles from "@/styles/Home.module.scss";

import Header from "./component/header";
import Intro from "./component/intro";
import Works from "./component/works";
import About from "./component/about";


export async function getStaticProps() {

  const url = 'https://ai-weather-by-meteosource.p.rapidapi.com/daily?place_id=south-of-market-7838987&language=en&units=auto';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '32e980ea2bmsh471eda03e5cbd27p15f0f0jsnb6324fe73347',
      'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
    }
  };

  const response = await fetch(url, options);

  if (response.status !== 200) {
    console.error(response);
  }

  const weatherData: tWeatherData = await response.json();
  const profile: ProfileType[] = await getProfile();
  const works: WorksType[] = await getWorks();

  //console.log('works', works);
  //console.log('weatherData', weatherData);

  return {
    props: {
      weatherData,
      profile,
      works,
    },
    revalidate: 86400,
  }

}

export default function Home({ weatherData: weather, profile, works }: { weatherData: tWeatherData, profile: ProfileType[], works: WorksType[] }) {
  //console.log('weatherData', weather.daily.data[0]);
  //console.log('hello', works);

  const sortedWorks = [...works].sort((a, b) => {
    const dateA = new Date(a.launchDate).getTime();
    const dateB = new Date(b.launchDate).getTime();
    return dateB - dateA;
  });

  //console.log('sortedWorks', sortedWorks);
  //console.log('profile', profile);

  return (
    <>
      <Header />
      <main className={`${styles.main}`}>
        
        <Intro weatherData={weather} profile={profile} />

        <Works works={sortedWorks} />
        
        <About  profile={profile} />

      </main>
    </>
  );
}
