interface SceneInterface {
  id: number;
  title: string;
  casting?: Array<PersonInterface>;
  image: string;
  reactions?: Array<ReactionInterface>;
  beginTimecode: number;
  endTimecode: number;
}

interface PersonInterface {
  id: number;
  description: string;
  name: string;
  image: string;
}

interface ReactionInterface {
  name: string;
  message: string;
  timecode: number;
}

export { SceneInterface, PersonInterface, ReactionInterface };
