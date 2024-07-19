
import React, { useEffect, useState } from "react";

import { getSingleWork } from "../../../sanity/sanity.query";
import type { WorksType } from "../../../types";
import { useRouter } from "next/router";

import Header from "../component/header";
import ProjectTools from "../component/project_tools";

import styles from "@/styles/Project.module.scss";


export default function Work() {

  const router = useRouter();
  const [work, setWork] = useState<WorksType | null>(null);

  useEffect(() => {
    const fetchWork = async () => {
      const workId = typeof router.query.id === 'string' ? router.query.id : null;
      if (!workId) return;

      const fetchedWork = await getSingleWork(workId);
      setWork(fetchedWork);
    };

    fetchWork();
  }, [router.query]);

  if (!work) {
    return null;
  }

  console.log('work', work);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <a href="/">
          &laquo; Back
        </a>
        <section className={styles.project_container}>
          <div className={styles.project_description}>
            <h3>{work.projectName}</h3>
            {work.description.split('\n').map((c, pIndex) => {
              return (<p key={pIndex}>{c}</p>)
            })}
            <ProjectTools data={work.skillsData} />

            <div className={styles.project_award}>
              {
                work.awardData ?  <h3>Featured in:</h3> : null
              }
              {
                work.awardData && work.awardData.map((award, index) => {
                  return (
                    <ul key={index}>
                      <li>{award}</li>
                    </ul>
                  )

                })
              }
            </div>
          </div>
          <div className={styles.project_gallery}>
            {
              work.gallery.map((image, index) => {
                  return (
                    <img key={index} src={image.image} alt={image.alt} />
                  )
                }
              )
            }
            {
              work.videoLinks?.youtube
                ? (<iframe width="960" height="540" src={work.videoLinks.youtube} allowFullScreen></iframe>)
                : null
            }
            {
              work.videoLinks?.vimeo
                ? (<div><p>Password: crd@AKQA</p><iframe src={work.videoLinks.vimeo} width="960" height="540" allowFullScreen/></div>)
                : null
            }
          </div>
        </section>
      </main>
    </>
  );
}
