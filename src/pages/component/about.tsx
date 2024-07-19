
import type { ProfileType } from "../../../types";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.scss";

import ProjectTools from "./project_tools";



export default function About({ profile }: { profile: ProfileType[] }) {

  //console.log('profile', profile);

  return (
    <>
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
                          <Link target="_blank" href={value}>{key[0].toUpperCase() + key.toLowerCase().slice(1)}</Link>
                        </li>
                      )
                    )
                  }
                  <li>
                    <Link target="_blank" href={data.resumeURL}>Resume</Link>
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
    </>
  );
}
