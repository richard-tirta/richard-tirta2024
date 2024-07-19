// sanity/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
      _id,
      fullName,
      headline,
      profileImage {alt, "image": asset->url},
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks,
      "skillsData": skills,
      "conceptData": concept,
      contact,
    }`
  );
}

export async function getWorks() {
  return client.fetch(
    groq`*[_type == "works"]{
      _id,
      projectName,
      clientName,
      thumbnail {alt, "image": asset->url},
      launchDate,
      "skillsData": skills,
    }`
  );
}

export async function getSingleWork(slug: string) {
  return client.fetch(
    groq`*[_type == "works" && _id == $slug][0]{
      _id,
      projectName,
      clientName,
      description,
      link,
      launchDate,
      gallery[] {alt, "image": asset->url},
      "videoLinks" : videolLinks,
      "skillsData": skills,
      "awardData": award,
    }`,
    {slug}
  );
}