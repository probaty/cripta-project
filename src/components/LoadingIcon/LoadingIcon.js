import "./LoadingIcon.css";

export default function LoadingIcon(props) {
  const classes =
    "opacity-80 w-60 flex justify-center items-center py-1 bg-blue-200 border-blue-200 rounded-md border";
  return (
    <div
      className={`${classes} ${
        props.big ? "lds-dual-ring-big" : "lds-dual-ring"
      }`}
      style={{
        width: props.width,
        height: props.height,
        background: props.background,
        border: props.border,
      }}
    ></div>
  );
}
