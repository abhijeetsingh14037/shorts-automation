import { Sequence, OffthreadVideo, Audio, AbsoluteFill, staticFile } from "remotion";

type ClipType = {
  src: string;
  start: number;
  length: number;
};

type Props = {
  clips: ClipType[];
  audioUrl: string;
};

export const ShortsComponent: React.FC<Props> = ({ clips, audioUrl }) => {
  const fps = 30;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {clips.map((clip, index) => {
        const startFrame = Math.round(clip.start * fps);
        const durationFrames = Math.round(clip.length * fps);

        return (
          <Sequence key={index} from={startFrame} durationInFrames={durationFrames}>
            <OffthreadVideo
              src={clip.src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>
        );
      })}

      {audioUrl ? (
        <Audio src={audioUrl.startsWith("http") ? audioUrl : staticFile(audioUrl)} />
      ) : null}
    </AbsoluteFill>
  );
};