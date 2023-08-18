import {
  AiOutlineUnlock,
  AiOutlineLock,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GoGlobe } from "react-icons/go";
const icons = {
  lock: <AiOutlineLock style={{ color: "rgba(151, 151, 151, 1)" }} />,
  unlock: <AiOutlineUnlock />,
  globe: <GoGlobe style={{ color: "rgba(103, 99, 99, 1)" }} />,
  left: <AiOutlineLeft style={{ color: "rgba(34, 170, 85, 0.98)" }} />,
  right: <AiOutlineRight style={{ color: "rgba(34, 170, 85, 0.98)" }} />,
  search: <FiSearch style={{ color: "rgba(151, 151, 151, 1)" }} />,
  plus: <AiOutlinePlusCircle style={{ color: "rgba(151, 151, 151, 1)" }} />,
};

export default icons;
