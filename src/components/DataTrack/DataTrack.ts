import { useEffect } from "react";
import { DataTrack as IDataTrack } from "twilio-video";
import { useSnackbar} from "notistack";
import { getRandomVariant } from "../Buttons/ChatSnackButton/ChatInput";

export default function DataTrack({ track }: { track: IDataTrack }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleMessage = (message: string) => {
      enqueueSnackbar(
        message,
        {
          preventDuplicate: true,
          variant: getRandomVariant(),
        }
      );
    };
    track.on("message", handleMessage);
    return () => {
      track.off("message", handleMessage);
    };
  }, [track, enqueueSnackbar]);

  return null; // This component does not return any HTML, so we will return 'null' instead.
}
