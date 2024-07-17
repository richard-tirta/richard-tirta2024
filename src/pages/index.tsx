import Head from "next/head";
import { Inter } from "next/font/google";
import { getProfile, getWorks } from "../../sanity/sanity.query";
import type { ProfileType, WorksType } from "../../types";

import styles from "@/styles/Home.module.scss";

import Image from "next/image";
import logo from "/public/logo-richardtirta.png";

const inter = Inter({ subsets: ["latin"] });

type tWeatherData = {
  "lat": string,
  "lon": string,
  "elevation": number,
  "units": string,
  "daily": {
    data: [
      {
        summary: string,
      },
    ],
  },
}


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
    throw new Error('Failed to fetch weather data');
  }

  const weatherData = await response.json();
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
    revalidate: 36000,
  }

}

export default function Home({ weatherData: weather, profile, works }: { weatherData: tWeatherData, profile: ProfileType[], works: WorksType[] }) {
  // console.log('weatherData', weather.daily.data[0]);

  // console.log('hello', works);

  // const test = works.map((data) => {
  //   console.log('data', data.skillsData);
  //   data.skillsData.map((skill) => { 
  //     console.log('skill', skill);
  //   })
  //  });


  return (
    <>
      <Head>
        <title>Richard is happy to help you own the world</title>
        <meta name="description" content="Front End Developer with over 8 years experience. Specialize in marketing industry." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="logo-container">
          <a id="logo-richardtirta" href="/" className="logo-richardtirta">
            <Image alt="Richard Tirta Widjaja" src={logo} width={500} height={59} />
            <span>Richard Tirta Widjaja</span>
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="#works">Works</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#thoghts">Thoughts</a></li>
          </ul>
        </nav>
      </header>
      <main className={`${styles.main} ${inter.className}`}>
        {
          profile && profile.map(
            (data) => (
              <section className={`${styles.intro}`} id="intro-text" key={data._id}>
                <div className={`${styles.intro_left}`}>
                  <h1>HELLO! &#128513;</h1>
                  <p >
                    {data.shortBio}
                  </p>
                  <p>
                    This is what it feels right now in {data.location}: {weather.daily.data[0].summary}
                  </p>
                </div>
                <div className={`${styles.intro_right}`}>
                  <ul>
                    { 
                      Object.entries(data.socialLinks).sort().map(
                        ([key, value], id) => (
                          <li key="id">
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

        <section id="works">
          <h3>
            <span className="featured"></span>
            WORKS
          </h3>

          <p className="align-right">Last Updated: February 2021</p>

          <div id="works-container">
            {
              works && works.map(
                (data) => (
                  <div className={`${styles.project_container}`} key={data._id}>
                    <div className={`${styles.project_description}`}>
                      <h4>{data.projectName}</h4>
                      <p>{data.clientName}</p>
                      <ul>
                        {
                          data.skillsData && data.skillsData.map(
                            (skill, id) => (
                              <li key={id}>{skill}</li>
                            )
                          )
                        }
                      </ul>
                    </div>
                    <div className={`${styles.project_image}`}>
                      <Image src={data.thumbnail.image} alt={data.thumbnail.alt} width={500} height={500} />
                    </div>
                  </div>
                )
              )
            }
          </div>
        </section>
        <section id="about">
          <h3>
            <span className="featured"></span>
            ABOUT
          </h3>

          <div id="works-container">

          </div>
        </section>
      </main>
    </>
  );
}
