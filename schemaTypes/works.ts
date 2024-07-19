// schemas/works.ts

import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const works = {
  name: "works",
  title: "Works",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "thumbnail",
      title: "Project Thumbnail",
      type: "image",
      description: "Upload Thumbnail Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
          validation: (rule) => rule.required(),
        },
      ],
    }),
    {
      name: "description",
      title: "Project description",
      type: "text",
      rows: 5,
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url'
    },
    {
      title: 'Launch date',
      name: 'launchDate',
      type: 'date'
    },
    {
      name: 'gallery',
      type: 'array',
      of: [
        { type: 'image' }
      ],
      options: {
        layout: 'grid'
      }
    },
    {
      name: "videolLinks",
      title: "Video Links",
      type: "object",
      description: "Add your video links:",
      fields: [
        {
          name: "vimeo",
          title: "Vimeo URL",
          type: "url",
        },
        {
          name: "youtube",
          title: "Youtube URL",
          type: "url",
        },
      ],
      options: {
        collapsed: false,
        collapsible: true,
      },
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      description: "Add a list of skills",
      of: [{ type: "string" }],
    },
    {
      name: "award",
      title: "Award",
      type: "array",
      description: "Add a list of awards",
      of: [{ type: "string" }],
    },
 ],
};

export default works;