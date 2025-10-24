import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";

interface DescriptionRendererProps {
  description: PortableTextBlock[] | string;
}

export default function DescriptionRenderer({ description }: DescriptionRendererProps) {
  // Handle legacy text format
  if (typeof description === 'string') {
    return (
      <div>
        {description.split('\n').map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '1rem' }}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  // Handle new Portable Text format
  if (Array.isArray(description)) {
    return (
      <PortableText 
        value={description}
        components={{
          block: {
            normal: ({children}) => <p style={{marginBottom: '1rem'}}>{children}</p>,
            h1: ({children}) => <h1>{children}</h1>,
            h2: ({children}) => <h2>{children}</h2>,
            h3: ({children}) => <h3>{children}</h3>,
            blockquote: ({children}) => <blockquote>{children}</blockquote>,
          },
          marks: {
            strong: ({children}) => <strong>{children}</strong>,
            em: ({children}) => <em>{children}</em>,
            link: ({children, value}) => (
              <a href={value.href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          },
        }}
      />
    );
  }

  // Fallback for empty or invalid content
  return <p>No description available.</p>;
}