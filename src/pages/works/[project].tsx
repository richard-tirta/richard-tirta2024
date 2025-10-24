

import { getSingleWork } from "../../../sanity/sanity.query";
import type { WorksType } from "../../../types";
import DescriptionRenderer from "../component/DescriptionRenderer";

import Link from "next/link";
import Image from "next/image";

import Header from "../component/header";
import ProjectTools from "../component/project_tools";
import { SHIMMER, TO_BASE_64 } from "../../component/variables"

import styles from "../../styles/Project.module.scss";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  
  //console.log('context', context);
  
  const work= await getSingleWork(context.params.project);

  return {
    props: {
      work
    },
    revalidate: 86400,
  }

}


export default function Work({ work }: { work: WorksType }) {

  //console.log('work', work);

  if (!work) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Link href="/">
          &laquo; Back
        </Link>
        <section className={styles.project_container}>
          <div className={styles.project_description}>
            <h3>{work.projectName}</h3>

            {
              work.link && (
                <a href={work.link} target="_blank">{work.link} &raquo;</a>
              )
            }

            <DescriptionRenderer description={work.description} />
            
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
              work.gallery && work.gallery.map((image, index) => {
                return (
                  index === 0
                    ? <Image key={index} src={image.image} alt={image.alt}
                      priority={true}
                      width={0}
                      height={0}
                      sizes="100vw"
                      placeholder={`data:image/svg+xml;base64,${TO_BASE_64(SHIMMER(700, 475))}`}
                      style={{ width: '100%', height: 'auto' }} />
                    : <Image key={index} src={image.image} alt={image.alt}  width={0}
                    height={0}
                      sizes="100vw"
                      placeholder={`data:image/svg+xml;base64,${TO_BASE_64(SHIMMER(700, 475))}`}
                    style={{ width: '100%', height: 'auto' }} />
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
