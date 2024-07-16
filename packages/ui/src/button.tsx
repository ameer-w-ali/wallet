import { ReactNode } from "react";

type propTypes = {
  children: ReactNode;
  onClick: () => void;
};
export default function Button({ children, onClick }: propTypes) {
  return (
    <button onClick={onClick} className="btn btn-gray">
      {children}
    </button>
  );
}
