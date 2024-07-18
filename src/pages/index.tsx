
import { getProfile, getWorks } from "../../sanity/sanity.query";
import type { tWeatherData, ProfileType, WorksType } from "../../types";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";

import Header from "./component/header";
import ProjectTools from "./component/project_tools";

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
    revalidate: 36000,
  }

}

export default function Home({ weatherData: weather, profile, works }: { weatherData: tWeatherData, profile: ProfileType[], works: WorksType[] }) {
  // console.log('weatherData', weather.daily.data[0]);
  //console.log('hello', works);

  const sortedWorks = [...works].sort((a, b) => {
    const dateA = new Date(a.launchDate).getTime();
    const dateB = new Date(b.launchDate).getTime();
    return dateB - dateA;
  });

  //console.log('sortedWorks', sortedWorks);
  console.log('profile', profile);

  return (
    <>
      <Header />
      <main className={`${styles.main}`}>
        {
          profile && profile.map(
            (data) => (
              <section className={`${styles.intro}`} id="intro-text" key={data._id}>
                <div className={`${styles.intro_left}`}>
                  <h1>HELLO! &#128513;</h1>
                  <p >
                    {data.shortBio}
                  </p>
                  {/* {
                    weather ?
                      <p>
                        This is what it feels right now in {.location}: {weather.daily.data[0].summary}
                      </p>
                      : null
                  } */}
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

        <section id="works">
          <h3>
            <span className="featured"></span>
            WORKS
          </h3>

          <p className="align-right">Last Updated: July 2024</p>

          <div id="works-container">
            {
              sortedWorks && sortedWorks.map(
                (data) => (
                  <Link
                    className={`${styles.project_container}`}
                    key={data._id}
                    href={`/works/${encodeURIComponent(data.projectName.replace(/[(\s]+/g, '-').replace(/[)]+/g, '').toLowerCase())}?id=${data._id}`}
                  >
                    <div className={`${styles.project_description}`}>
                      <h4>{data.projectName}</h4>
                      <p>{data.clientName}</p>
                      <ProjectTools data={data.skillsData} />
                    </div>
                    <div className={`${styles.project_image}`}>
                      <Image src={data.thumbnail.image} alt={data.thumbnail.alt} width={824} height={212} />
                    </div>
                  </Link>
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
          {
            profile && profile.map(
              (data) => (
                <div className={`${styles.about_container}`} key={data._id}>
                  <div className={`${styles.about_text}`}>
                    <PortableText value={data.fullBio}/>
                    
                    <h3>How to reach me</h3>
                    <PortableText value={data.contact} />
                    <p>
                      <b>Email:</b> {data.email}
                    </p>
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
                  <div className={`${styles.about_text2}`}>
                    <div className="about-picture">
                    <p>
                      <b>Technical Tools</b>
                    </p>
                    <ProjectTools data={data.skillsData} />
                    <p>
                      <b>Conceptual Skills</b>
                    </p>
                    <ProjectTools data={data.conceptData} />
                      <Image src={data.profileImage.image} alt={data.profileImage.alt} width={828} height={662} />
                    </div>
                  </div>
                </div>
              )
            )
          }

        </section>
      </main>
    </>
  );
}
