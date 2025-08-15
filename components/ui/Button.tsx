import Link from "next/link";

interface ButtonProps {
  transparent?: boolean;
  btnLink?: string;
  btnText?: string;
}

function Button({ transparent = false, btnLink = "/", btnText = "Open" }: ButtonProps) {
  const btnStyle = transparent
    ? "backdrop-blur-md text-white hover:bg-white hover:text-black"
    : "bg-white text-black hover:bg-transparent hover:text-white";

  return (
    <Link
      href={btnLink}
      className={`${btnStyle} flex items-center justify-center text-xl p-2 font-semibold border-2 border-white rounded-lg transition-all`}
    >
      {btnText}
    </Link>
  );
}

export default Button;