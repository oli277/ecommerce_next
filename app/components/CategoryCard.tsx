import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/types";

export default function CategoryCard({ name, slug, image }: Category) {
  return (
    <Link href={`/categories/${slug}`} className="group block w-full">
      <div className="relative aspect-[7/8] w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="pt-3">
        <p className="text-base text-orange-700 group-hover:underline">{slug}</p>
        <h3 className="text-xl text-black">{name}</h3>
      </div>
    </Link>
  );
}