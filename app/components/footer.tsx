import FooterButtons from "./FooterButton";

import {
  FaFacebook,
  FaSquareYoutube,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa6";

const socials = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebook },
  { href: "https://youtube.com", label: "YouTube", Icon: FaSquareYoutube },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
  { href: "https://tiktok.com", label: "TikTok", Icon: FaTiktok },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-200">
      <ul className="flex items-center justify-center gap-10 px-4 py-4">
        {socials.map(({ href, label, Icon }) => (
          <li key={label}>
            <FooterButtons href={href} label={label}><Icon/></FooterButtons>
          </li>
        ))}
      </ul>
    </footer>
  );
}
