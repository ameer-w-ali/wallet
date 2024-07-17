type PropTypes = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export default function Card({ title, children, className }: PropTypes) {
  return (
    <div className={`border p-6 rounded-xl bg-neutral-50 ${className}`}>
      <h1 className="text-2xl font-bold pb-4">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
