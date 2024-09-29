import PropTypes from 'prop-types';
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.Pending || 0,
      icon: <FaSuitcaseRolling size={35} color="#f59e0b" />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.Interview || 0,
      icon: <FaCalendarCheck size={35} color="#647acb" />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: defaultStats?.Declined || 0,
      icon: <FaBug size={35} color="#d66a6a" />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-4 xl:grid-cols-3">
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </div>
  );
};

StatsContainer.propTypes = {
  defaultStats: PropTypes.shape({
    Pending: PropTypes.number,
    Interview: PropTypes.number,
    Declined: PropTypes.number,
  }).isRequired,
};

export default StatsContainer;
