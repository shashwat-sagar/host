const Heading = ({ title = "" }) => {
  return (
    <div className="p-5 text-left bg-primary">
      <h1 className="text-3xl font-semibold capitalize text-white">{title || "--"}</h1>
    </div>
  );
};
const SubHeading = ({ title = "", color = "#000" }) => {
  return (
    <h2 className="text-2xl font-semibold text-slate-700 my-2" style={!color ? {} : { color: color }}>
      {title || "--"}
    </h2>
  );
};

export { Heading, SubHeading };
