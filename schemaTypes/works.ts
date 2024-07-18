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
      title: 'Video Link',
      name: 'videoLink',
      type: 'array',
      of: [{type: 'url'}],
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
      title: "Awards",
      type: "array",
      description: "Add a list of awards",
      of: [{ type: "string" }],
    },
 ],
};

export default works;