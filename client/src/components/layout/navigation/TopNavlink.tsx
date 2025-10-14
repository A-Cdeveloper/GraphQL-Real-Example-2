import { NavLink } from "react-router";

const TopNavlink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const linkClasses = "font-semibold text-muted-foreground hover:text-primary";
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "text-primary" : linkClasses)}
      end
    >
      {children}
    </NavLink>
  );
};

export default TopNavlink;
