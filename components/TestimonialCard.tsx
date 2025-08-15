import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface TestimonialCardProps {
  img: string | StaticImageData;
  name: string;
  role?: string;
  children: React.ReactNode;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ img, name, role, children }) => {
  return (
    <div className="mt-10 bg-gray-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 relative mb-4">
          <Image 
            src={img} 
            alt={name} 
            fill
            className="rounded-full border-2 border-blue-200 object-cover"
          />
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">{name}</h3>
        {role && <p className="text-sm text-blue-600 font-medium mb-3">{role}</p>}
        <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;