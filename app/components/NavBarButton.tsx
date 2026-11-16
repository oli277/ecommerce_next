import Link from "next/link"

export default function NavBarButton({href, children}:{href:string, children: React.ReactNode}){
    return(
        <>
        <Link href={href} className="transition-colors hover:text-gray-900">{children}</Link>
        </>
    )
}