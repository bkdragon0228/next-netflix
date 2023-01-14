import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function index() {
  return (
    <div style={{ width: "200px" }}>
      <SkeletonTheme highlightColor="black">
        <Skeleton width="50px" height="50px" circle={true} borderRadius="500" />
        <Skeleton count={3} />
      </SkeletonTheme>
    </div>
  );
}
