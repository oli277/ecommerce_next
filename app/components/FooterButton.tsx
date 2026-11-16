import Link from "next/link";

export default function FooterButtons({href, label, children}:{href:string, label:string, children:React.ReactNode}){
    return(
        <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="block text-3xl text-gray-500 transition-colors hover:text-gray-700"
            >
              {children}
            </Link>
    )
}