
import type { WorksType } from "../../../types";

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";

import ProjectTools from "./project_tools";


export default function Works({  works }: { works: WorksType[] }) {

  //console.log('hello', works);

  const sortedWorks = works && Array.isArray(works) ? [...works].sort((a, b) => {
    const dateA = new Date(a.launchDate).getTime();
    const dateB = new Date(b.launchDate).getTime();
    return dateB - dateA;
  }) : [];

  //console.log('sortedWorks', sortedWorks);

  return (
    <>
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
    </>
  );
}
