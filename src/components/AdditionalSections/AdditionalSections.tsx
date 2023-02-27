// React imports
import { useState } from 'react';
// Component import
import { CircularProgress } from '@mui/material';
import TimeCodeSelector from './TimeCodeSelector/TimeCodeSelector';
// Utils imports
import sceneService from '../../api/scene.service';
import { PersonInterface, ReactionInterface, SceneInterface } from '../../types';
//Css imports
import styles from './AdditionalSections.css';

/**
 * Display the multiple additonal sections (usually, just the scene according to a timeCode)
 * @returns AdditionalSections component
 */
const AdditionalSections = (): JSX.Element => {
  const [scene, setScene] = useState<SceneInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <h1>Additional Sections</h1>
      <h2>Scene details according to timeCode</h2>
      <TimeCodeSelector
        onClick={(timeCode: string) => {
          setLoading(true);
          sceneService.getScene(Number(timeCode)).then((value: SceneInterface) => {
            setScene(value);
            setLoading(false);
          });
        }}
      />
      {loading && <CircularProgress />}
      {scene && scene.id ? (
        <section className={styles.sectionContainer}>
          <p>id: {scene.id}</p>
          <p>title: {scene.title}</p>
          {scene.casting && (
            <details className={styles.details}>
              <summary>Casting</summary>
              {scene.casting.map((person: PersonInterface) => (
                <section key={person.id}>
                  <p>id : {person.id}</p>
                  <p>description : {person.description}</p>
                  <p>name : {person.name}</p>
                  <p>image : {person.image}</p>
                </section>
              ))}
            </details>
          )}

          <p>image: {scene.image}</p>
          {scene.reactions && (
            <details className={styles.details}>
              <summary>Reactions</summary>
              {scene.reactions.map((reaction: ReactionInterface) => (
                <section key={`${reaction.name}_${reaction.timecode}`}>
                  <p>name : {reaction.name}</p>
                  <p>message : {reaction.message}</p>
                  <p>timecode : {reaction.timecode}</p>
                </section>
              ))}
            </details>
          )}

          <p>beginTimecode: {scene.beginTimecode}</p>
          <p>endTimecode: {scene.endTimecode}</p>
        </section>
      ) : (
        <>{!loading && <p>No selected scene or no scene found</p>}</>
      )}
    </div>
  );
};

export default AdditionalSections;
