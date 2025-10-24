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
    // Temporary: Keep old description for migration
    {
      name: "descriptionOld",
      title: "Project description (OLD - for migration)",
      type: "text",
      rows: 5,
      hidden: true, // Hide from Studio UI
    },
    defineField({
      name: "description",
      title: "Project description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
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