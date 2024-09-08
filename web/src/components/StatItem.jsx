const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <>
      <div
        className="p-8 rounded-md shadow-custom-3"
        style={{
          borderBottom: `5px solid ${color}`,
        }}
      >
        <header className="flex items-center justify-between">
          <span
            className="text-2xl text-white block font-700 text-[50px] leading-[2]"
            style={{ color: color }}
          >
            {count}
          </span>
          <span
            className="w-[70px] h-[60px] rounded-md flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {icon}
          </span>
        </header>
        <h3 className="m-0 capitalize tracking-[1px] text-left mt-2 text-xl">
          {title}
        </h3>
      </div>
    </>
  );
};

export default StatItem;
