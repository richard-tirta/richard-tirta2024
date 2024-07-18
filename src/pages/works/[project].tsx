
import React, { useEffect, useState } from "react";
import Header from "../component/header";
import { getSingleWork } from "../../../sanity/sanity.query";
import type { WorksType } from "../../../types";
import { useRouter } from "next/router";


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
      <main>
        <section className="lightbox-container">
          <a href="/" className="lightbox-close">
            &laquo; BACK
          </a>
          <div className="lightbox-project">
            <div className="lightbox-description">
              <h3>{work.projectName}</h3>
              {work.description.split('\n').map((c, pIndex) => {
                return (<p key={pIndex}>{c}</p>)
              })}
              <div className="lightbox-tools">{
                work.skillsData.map((tools, subindex) =>
                  <span key={subindex}>{tools}</span>
                )
              }</div>
            </div>
            {/* <div className="lightbox-image">
              {getGalleryImage(currentProjectData.name)}
              {currentProjectData.youtube ? <div dangerouslySetInnerHTML={{ __html: currentProjectData.youtube }}></div> : null}
              {currentProjectData.vimeo ? <div className="video-container" dangerouslySetInnerHTML={{ __html: currentProjectData.vimeo }}></div> : null}
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
}
