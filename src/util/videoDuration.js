import moment from "moment";
import momentDurationSetup from "moment-duration-format";

momentDurationSetup(moment);

export default function videoDuration(duration) {
  return moment.duration(duration).format("h:mm:ss").padStart(4, "0:0");
}
