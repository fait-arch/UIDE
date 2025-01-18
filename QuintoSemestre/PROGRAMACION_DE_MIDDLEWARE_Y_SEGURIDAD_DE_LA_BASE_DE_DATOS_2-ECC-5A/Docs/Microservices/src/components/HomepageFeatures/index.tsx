import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// JSON con el contenido de las características
const featuresData = {
  features: [
    {
      title: "Easy to Use",
      image: "https://docusaurus.io/img/undraw_typewriter.svg",
      description: "Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly."
    },
    {
      title: "Focus on What Matters",
      image: "/home/fait-arch/Escritorio/Development/Github/UIDE/QuintoSemestre/PROGRAMACION_DE_MIDDLEWARE_Y_SEGURIDAD_DE_LA_BASE_DE_DATOS_2-ECC-5A/Docs/Microservices/static/img/undraw_docusaurus_tree.svg",
      description: "Docusaurus lets you focus on your docs, and we'll do the chores. Go ahead and move your docs into the docs directory."
    },
    {
      title: "Powered by React",
      image: "/home/fait-arch/Escritorio/Development/Github/UIDE/QuintoSemestre/PROGRAMACION_DE_MIDDLEWARE_Y_SEGURIDAD_DE_LA_BASE_DE_DATOS_2-ECC-5A/Docs/Microservices/static/img/undraw_docusaurus_react.svg",
      description: "Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same header and footer."
    }
  ]
};

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} alt={title} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featuresData.features.map((feature, idx) => (
            <Feature
              key={idx}
              title={feature.title}
              image={feature.image}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
