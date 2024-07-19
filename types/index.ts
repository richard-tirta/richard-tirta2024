// types/index.ts

import { PortableTextBlock } from "sanity";

export type tWeatherData = {
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

export type ProfileType = {
  _id: string,
  fullName: string,
  headline: string,
  profileImage: {
    alt: string,
    image: string
  },
  shortBio: string,
  email: string,
  fullBio: PortableTextBlock[],
  location: string,
  resumeURL: string,
  socialLinks: string[],
  skillsData: string[],
  conceptData: string[],
  contact: PortableTextBlock[],
};

export type WorksType = {
  _id: string,
  projectName: string,
  clientName: string,
  thumbnail: {
    alt: string,
    image: string
  },
  description: string,
  link: string,
  launchDate: string,
  gallery: {
    alt: string,
    image: string
  }[],
  videoLinks: {
    vimeo: string,
    youtube: string,
  },
  socialLinks: string[],
  skillsData: string[],
  awardData: string[],
};