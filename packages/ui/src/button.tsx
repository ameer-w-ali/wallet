import { ReactNode } from "react";

type PropTypes = {
  children: ReactNode;
  onClick: () => void;
};
export default function Button({ children, onClick }: PropTypes) {
  return (
    <button onClick={onClick} className="btn btn-gray">
      {children}
    </button>
  );
}
