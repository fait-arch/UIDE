import React, { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import axios from 'axios';

type FeatureItem = {
  id: number;
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
  const [features, setFeatures] = useState<FeatureItem[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/caracteristicas');
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature) => (
            <Feature
              key={feature.id}
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
