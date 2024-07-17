// types/index.ts

import { PortableTextBlock } from "sanity";

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
  skills: string[],
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
  videoLink: {
    url: string
  }[],
  skillsData: string[],
  awards: string[],
};