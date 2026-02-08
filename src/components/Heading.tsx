const Heading = ({ title = "" }) => {
  return (
    <div className="mb-8 text-center md:text-left">
      <h1 className="text-2xl font-bold text-slate-800">{title || "--"}</h1>
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
