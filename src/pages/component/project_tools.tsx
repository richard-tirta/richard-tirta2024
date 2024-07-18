
type ProjectToolsProps = {
  data: string[],
}


export default function ProjectTools( { data } : ProjectToolsProps ) {


  return (
    <>
      <ul className="project_tools">
        {
         data && data.map(
            (skill, id) => (
              <li key={id}>{skill}</li>
            )
          )
        }
      </ul>
    </>
  );
}
