const Jobinfo = ({ icon, text }) => {
  return (
    <div className="flex  items-center">
      <span className="text-[1rem] mr-4 flex items-center">{icon}</span>
      <span className=" capitalize tracking-[1px]">{text}</span>
    </div>
  );
};

export default Jobinfo;
