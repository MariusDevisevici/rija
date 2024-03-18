import React from "react";

interface IProjectCard {
  projectName: string;
  createdAt: string;
  updatedAt: string;
}

const ProjectCard = ({ projectName }: IProjectCard) => {
  return <div>{projectName}</div>;
};

export default ProjectCard;
