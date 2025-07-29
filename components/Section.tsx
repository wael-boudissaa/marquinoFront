interface SectionProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center h-7 mb-6">
        <div className="bg-blue-600 w-1 h-full rounded-full"></div>
        <h2 className="text-2xl pl-3 font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default Section;